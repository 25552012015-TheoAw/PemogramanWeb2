import User from "../model/userModel.js";

export const create = async(req, res) => {
    try {
        const userData = new User(req.body);
        const { email } = userData;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User Already Exists." });
        }
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
    } catch (error) {
        console.log(error); // Tambahkan ini supaya error aslinya muncul di terminal
        res.status(500).json({ error: error.message }); // Ini akan nampilin pesan error di Postman
    }
};
export const fetch = async(req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: "User not Found" });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const update = async(req, res) => {
    try {
        const id = req.params.id; // Mengambil ID dari URL
        const userExist = await User.findById(id); // Cek apakah ID ada di database
        if (!userExist) {
            return res.status(404).json({ message: "User Not Found." })
        }
        const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true })
        res.status(201).json(updateUser);
    } catch (error) {
        console.log(error); // LIHAT DI TERMINAL VS CODE
        res.status(500).json({ error: "Internal Server error" });
    }
};

export const deleteUser = async(req, res) => {
    try {
        const id = req.params.id; // Mengambil ID dari URL
        const userExist = await User.findById(id); // Cek apakah ID ada di database
        if (!userExist) {
            return res.status(404).json({ message: "User Not Found." });
        }
        await User.findByIdAndDelete(id);
        res.status(201).json({ message: "User Deleted Succesfully" });
    } catch (error) {
        console.log(error); // LIHAT DI TERMINAL VS CODE
        res.status(500).json({ error: "Internal Server error" });
    }
}