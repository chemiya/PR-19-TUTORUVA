module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      descripcion: String,
      estadotutoria: String,
      idalumnoparticipante: String,
      idprofesorparticipante: String,
      idcreador: String,
      fecha:String,
      horainicio:String,
      horafin:String,
      nombrecompletoalumno:String,
      nombrecompletoprofesor:String
      
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutoria = mongoose.model("tutoria", schema);
  return Tutoria;
};
