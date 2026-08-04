const Contact = require("../models/Contact");

// @desc    Save Contact Form
// @route   POST /api/contact
// @access  Public

const saveContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Save to MongoDB
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: contact,
    });

  } catch (error) {
    console.error("Contact Error:", error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  saveContact,
};