const responseHelper = (res, resObj) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (resObj.error) {
    return res.json({
      status: resObj.status,
      error: resObj.error,
    });
  }
  return res.json({
    status: resObj.status,
    message: resObj.message,
    data: resObj.data,
  });
};

export default responseHelper;
