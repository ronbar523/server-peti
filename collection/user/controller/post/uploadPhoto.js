const uploadPhoto = async (req,res) => {
  try {
    const url = req.protocol + "://" + req.get("host");
  
    const photo = url + "/public/" + req.file.filename;

  
    res.json({ status: 200, photo: photo });
  
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
}

module.exports = {
  uploadPhoto,
};