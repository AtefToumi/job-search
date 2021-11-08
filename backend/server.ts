import app from './index'
const port = process.env.PORT

console.log(`Node environment: ${process.env.NODE_ENV}`);
app.listen(port, () => {
    console.log(`App listening at port http://localhost:${port}`)
})

