module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      usuariouva: String,
      password: String,
      email: String,
      grado: String,
      nombre: String,
      apellidos: String,
      fotoRuta:String
      
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Alumno = mongoose.model("alumno", schema);
  return Alumno;
};
