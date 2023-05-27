module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      idprofesor: String,
      idalumno: String,
      nombre:String,
      apellidos:String,
      email:String,
      despacho:String,
      fotoRuta:String
     
      
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const ProfesorGuardado = mongoose.model("profesorguardado", schema);
  return ProfesorGuardado;
};
