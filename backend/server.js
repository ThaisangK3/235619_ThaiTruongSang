require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json({ limit: '100kb' }));

const allowedStatuses = ['Đang sử dụng', 'Hư hỏng', 'Đang sửa chữa', 'Ngừng sử dụng'];
const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  deviceType: { type: String, required: true, trim: true },
  room: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0, validate: Number.isInteger },
  status: { type: String, required: true, enum: allowedStatuses },
  purchaseDate: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  description: { type: String, default: '' }
}, { timestamps: true, collection: 'devices' });
const Device = mongoose.model('Device', deviceSchema);

const fields = ['deviceId','name','deviceType','room','brand','model','quantity','status','purchaseDate','description'];
function pickFields(data) {
  return Object.fromEntries(fields.filter(k => Object.hasOwn(data, k)).map(k => [k, data[k]]));
}
function sendError(res, err) {
  if (err.code === 11000) return res.status(409).json({ message: 'Mã thiết bị đã tồn tại' });
  if (err.name === 'ValidationError') return res.status(400).json({ message: 'Dữ liệu không hợp lệ', details: Object.values(err.errors).map(e => e.message) });
  if (err.name === 'CastError') return res.status(400).json({ message: 'ID không hợp lệ' });
  console.error('API error:', err.message);
  return res.status(500).json({ message: 'Lỗi máy chủ hoặc kết nối cơ sở dữ liệu' });
}
function checkId(req, res, next) {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'ID không hợp lệ' });
  next();
}

app.get('/health', (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({ status: connected ? 'ok' : 'database_unavailable', database: connected ? 'connected' : 'disconnected' });
});
app.get('/api/devices', async (req, res) => {
  try {
    const search = String(req.query.search || '').trim();
    const safe = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const filter = search ? { $or: ['deviceId', 'name', 'deviceType', 'room'].map(field => ({ [field]: { $regex: safe, $options: 'i' } })) } : {};
    res.json(await Device.find(filter).sort({ deviceId: 1 }).lean());
  } catch (err) { sendError(res, err); }
});
app.get('/api/devices/:id', checkId, async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ message: 'Không tìm thấy thiết bị' });
    res.json(device);
  } catch (err) { sendError(res, err); }
});
app.post('/api/devices', async (req, res) => {
  try {
    const device = await Device.create(pickFields(req.body || {}));
    res.status(201).json(device);
  } catch (err) { sendError(res, err); }
});
app.put('/api/devices/:id', checkId, async (req, res) => {
  try {
    const update = pickFields(req.body || {});
    if (!Object.keys(update).length) return res.status(400).json({ message: 'Không có trường hợp lệ để cập nhật' });
    const device = await Device.findByIdAndUpdate(req.params.id, { $set: update }, { new: true, runValidators: true });
    if (!device) return res.status(404).json({ message: 'Không tìm thấy thiết bị' });
    res.json(device);
  } catch (err) { sendError(res, err); }
});
app.delete('/api/devices/:id', checkId, async (req, res) => {
  try {
    const device = await Device.findByIdAndDelete(req.params.id);
    if (!device) return res.status(404).json({ message: 'Không tìm thấy thiết bị' });
    res.json({ message: 'Xóa thiết bị thành công', device });
  } catch (err) { sendError(res, err); }
});
app.use((req, res) => res.status(404).json({ message: 'Không tìm thấy API' }));
app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && 'body' in err) return res.status(400).json({ message: 'JSON không hợp lệ' });
  sendError(res, err);
});

const port = Number(process.env.PORT) || 5000;
if (!process.env.MONGODB_URI) {
  console.error('Thiếu MONGODB_URI trong .env');
  process.exit(1);
}
mongoose.set('bufferCommands', false);
mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection failed:', err.message));
app.listen(port, '0.0.0.0', () => console.log(`API running at http://localhost:${port}`));
