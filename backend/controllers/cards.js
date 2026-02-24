const Card = require('../models/card');

// GET /cards
module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: 'Erro no servidor' });
  }
};

// POST /cards
module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({
      name,
      link,
      owner: req.user._id, // 🔹 MUDANÇA: owner vem do middleware
    });

    res.status(201).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Erro de validação' });
    }

    return res.status(500).send({ message: 'Erro no servidor' });
  }
};


// PUT /cards/:cardId/likes
module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, //  adiciona like sem duplicar
      { new: true }
    ).orFail(); 

    res.send(card);
  } catch (err) {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Card não encontrado' });
    }
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID inválido' });
    }
    return res.status(500).send({ message: 'Erro no servidor' });
  }
};


// DELETE /cards/:cardId
module.exports.deleteCard = async (req, res) => {


  try {
    const card = await Card.findById(req.params.cardId)
      .orFail(); // 🔹 MUDANÇA: orFail garante 404 se não existir


      

      // Válida o dono do cartão
      if (card.owner.toString() !== req.user._id) {
      return res.status(403).send({ message: 'Você não pode deletar o card de outro usuário' });
    }



    await card.deleteOne();
    res.send({ message: 'Cartão deletado com sucesso' });
  } catch (err) {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Cartão não encontrado' });
    }

    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID inválido' });
    }

    return res.status(500).send({ message: 'Erro no servidor' });
  }
};

// DELETE /cards/:cardId/likes — descurte um cartão

module.exports.dislikeCard = async (req, res) => {
 try{
    const card = await Card.findByIdAndUpdate(
        req.params.cardId, 
        { $pull: { likes: req.user._id } },
        {new: true}

    ).orFail();

    res.send(card)

 }
 catch (err) {
    if (err.name === 'DocumentNotFoundError') {
      return res.status(404).send({ message: 'Card não encontrado' });
    }
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'ID inválido' });
    }
    return res.status(500).send({ message: 'Erro no servidor' });
  }
};
// aa