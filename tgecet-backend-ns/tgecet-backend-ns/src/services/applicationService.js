const supabase = require("../config/supabase");

const saveApplication = async (applicationData) => {

  const { data, error } = await supabase
    .from("applications")
    .insert([applicationData])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

module.exports = {
  saveApplication
};