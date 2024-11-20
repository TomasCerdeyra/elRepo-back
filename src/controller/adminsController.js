import config from '../config/config.js';
import User from '../models/User.js'
import fs from 'fs'

const addAdminPath = config.ULR_ADMINS;

class adminController {

    static addAdmin = async (req, res) => {
        const { email } = req.body
        try {
            const data = fs.readFileSync(addAdminPath, 'utf-8')
            const adminData = JSON.parse(data)
            const user = await User.findOne({ email: email })

            if (user && user.isAdmin === false) {
                user.isAdmin = true
                await user.save()
            }
            
            if (!adminData.admins.includes(email)) {
                adminData.admins.push(email)

                fs.writeFileSync(addAdminPath, JSON.stringify(adminData, null, 2))
                res.status(201).send("Administrador agregado exitosamente")
            } else {
                res.send('El administrador ya existe')
            }
        } catch (error) {
            console.log('Error al ingresar el administrador');
        }
    }

    static getAdmins = (req, res) => {
        try {
            const data = fs.readFileSync(addAdminPath, 'utf-8')
            const adminData = JSON.parse(data)

            if (!adminData) {
                return res.send('No hay administardore')
            }

            res.send(adminData)
        } catch (error) {
            console.log('Error al treaer los administradores');

        }
    }

    static deleteAdmin = async (req, res) => {
        const { email } = req.body
        try {
            const data = fs.readFileSync(addAdminPath, 'utf-8')
            const adminData = JSON.parse(data)
            const user = await User.findOne({ email: email })

            if (user && user.isAdmin === true) {
                user.isAdmin = false
                await user.save()
            }
            
            if (adminData.admins.includes(email)) {
                adminData.admins.pop(email)

                fs.writeFileSync(addAdminPath, JSON.stringify(adminData, null, 2))
                res.status(201).send("Administrador eliminado exitosamente")
            } else {
                res.send('Administrador no encontrado')
            }

        } catch (error) {
            console.log('Error al eliminar el administrador');
        }
    }
}

export default adminController