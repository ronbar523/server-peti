const uploadMedia = async (req,res) => {
  try {
    const url = req.protocol + "://" + req.get("host");
  
    const media = url + "/public/" + req.file.filename;

  
    res.json({ status: 200, media: media });
  
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
}

module.exports = {
  uploadMedia,
};