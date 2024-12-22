import Express from "express"
import { getRelationships, addRelationship, deleteRelationship } from "../controllers/relationship.js"

const router = Express.Router()

router.get("/", getRelationships)
router.post("/", addRelationship)
router.delete("/", deleteRelationship)

export default router