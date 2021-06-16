import { app, router } from "./init/serverInit.js";
import { message, user } from "./sequelize/sequelize.js";
// -------- Messages ----------//
router.route("/getMessages").get(async (req, res) => {
  try {
    let messages = await message.findAll();
    if (messages) {
      res.status(200).json(messages);
    } else {
      res.status(404).json({ message: "no messages" });
    }
  } catch (e) {
    console.warn(e);
  }
});

router.route("/getMessages/:clientId").get(async (req, res) => {
  try {
    let messages = await message.findAll({
      where: {
        ClientId: req.params.clientId,
      },
    });
    if (messages) res.status(200).json(messages);
    else res.status(404).json({ message: "no messages" });
  } catch (e) {
    console.warn(e);
  }
});

router.route("/deleteMessage/:id").delete(async (req,res) => {
    try {
        let messageToBeDeleted = await message.findByPk(req.params.id)
        if(messageToBeDeleted){
            messageToBeDeleted.destroy()
            res.status(200).json({message:"accepted"})
        }
        else{
            res.status(404).json({message:"not found"})
        }
    }
    catch(e){
        console.warn(e);
    }
})

// --------- Messages ---- end //

export default router;
