import {Router, Request, Response, RouterOptions} from 'express'
import { getData, getAll, updateData, deleteData, createData } from '../controllers/crud'
import { register, login, refreshToken, listUsers, updateUser, userProfile, deleteUser } from '../controllers/user'
import { validateRefreshToken, validateAccessToken } from '../middlewares/validateTokens'
import {checkUpdateUser} from '../middlewares/checkUpdateUser'
import { testApi, scrap } from '../controllers/test'


const routes: Router = Router()


export const customResponse: any = (status: string, message: any) => {
    return {status, message}
}

//basic routes
routes.get('/health/', (req: Request, res: Response) => res.status(200).send(customResponse('ok', 'active')))
routes.route('/test/').get(testApi)
routes.route('/scrap/').get(scrap)

// CRUD routes
routes.route('/crud/')
    .get(validateAccessToken, getAll)
    .post(validateAccessToken, createData)
routes.route('/crud/:id/')
    .get(validateAccessToken, getData)
    .patch(validateAccessToken, updateData)
    .delete(validateAccessToken, deleteData)

// Users Routes
routes.route('/register/').post(register)
routes.route('/login/').post(login)
routes.route('/tkrefresh/').post(validateRefreshToken, refreshToken)
routes.route('/users/').get(validateAccessToken, listUsers)
routes.route('/users/:id')        
        .get(validateAccessToken, userProfile)
        .patch(validateAccessToken, checkUpdateUser,  updateUser)
        .delete(validateAccessToken,  deleteUser)

export default routes