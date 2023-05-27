module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      usuariouva: String,
      password: String,
      email: String,
      despacho: String,
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

  const Profesor = mongoose.model("profesor", schema);
  return Profesor;
};
