import Request from '../model/requestModel.js';

// ➤ Send a new request
export const sendRequest = async (req, res) => {
  try {
    const { senderId, receiverId, skill } = req.body;

    const newRequest = new Request({ senderId, receiverId, skill });
    await newRequest.save();

    res.status(201).json({ message: 'Request sent', request: newRequest });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send request' });
  }
};

// ➤ Get all requests received by a user
export const getRequestsForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const requests = await Request.find({ receiverId: userId })
      .populate('senderId', 'name email');

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

// ➤ Accept or Reject a request
export const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body; // 'accepted' or 'rejected'

    const updated = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    res.json({ message: `Request ${status}`, request: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update request status' });
  }
};
