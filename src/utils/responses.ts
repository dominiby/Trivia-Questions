export const successResponseJSON = (res: any, obj: any): any => {
  return res.status(200).json(obj);
}

export const errorResponseJSON = (res: any): any => {
  return res.status(500).json({ 
    message: "Oops, something went wrong"
  });
};
