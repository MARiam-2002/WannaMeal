import Tip from '../../../DB/model/tipModel.js';

export const createTip = async (req, res) => {
  try {
    const newTip = await Tip.create(req.body);
    const totalTips = await Tip.countDocuments();
    res.status(201).json({ status: 'success', data: { totalTips,tip: newTip } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const getAllTips = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalTips = await Tip.countDocuments();
    const totalPages = Math.ceil(totalTips / limit);

    const tips = await Tip.find().skip(skip).limit(limit);

    res.status(200).json({
      status: 'success',
      currentPage: page,
      totalPages: totalPages,
      results: tips.length,
      data: { tips }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const deleteTip = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTip = await Tip.findByIdAndDelete(id);
    if (!deletedTip) {
      return res.status(404).json({ message: 'Tip not found' });
    }
    const totalTips = await Tip.countDocuments();
    res.status(200).json({ status: 'success', message: 'Tip deleted successfully', deletedTip, totalTips });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const updateTip = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedTip = await Tip.findByIdAndUpdate(id, { title, content }, { new: true });

    if (!updatedTip) {
      return res.status(404).json({ message: 'Tip not found' });
    }

    const totalTips = await Tip.countDocuments();
    res.status(200).json({ status: 'success', message: 'Tip updated successfully', updatedTip, totalTips });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
