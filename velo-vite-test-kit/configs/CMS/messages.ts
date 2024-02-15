const schema = {
    _id: String,
    message: String,
    sender: String,
    receiver: String,
    viewed: Boolean,
};

const data = [
    { _id: '1', message: 'Test1', sender: 'xxx', receiver: 'yyy', viewed: false },
    { _id: '2', message: 'Test2', sender: 'xxx', receiver: 'yyy', viewed: true },
    { _id: '3', message: 'Test3', sender: 'xxx', receiver: 'yyy', viewed: false },
    { _id: '4', message: 'Test4', sender: 'xxx', receiver: 'yyy', viewed: true },
]

export default { schema, data }