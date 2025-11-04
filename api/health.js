module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  return res.status(200).json({
    status: 'ok',
    service: 'Studio AI Bot',
    timestamp: new Date().toISOString()
  });
};
