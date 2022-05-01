import React, { useRef } from 'react'
// import 'dotenv/config'
import { Container, Form, Button } from 'react-bootstrap'
import io from 'socket.io-client'

function Login({ login, websocket, userinfo }) {
    const refUserName = useRef()
    const refUserPass = useRef()
    async function handleSubmit(e) {
        try {
            e.preventDefault()
            const content = {
                username: refUserName.current.value,
                password: refUserPass.current.value
            }
            const res = await fetch(`${process.env.REACT_APP_HOST}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(content)
            })
            const data = await res.json()
            if (data.statusCode !== 401) {
                sessionStorage.setItem('token', data.message.token)
                console.log(data.message)
                const res1 = await fetch(`${process.env.REACT_APP_HOST}/message/${data.message.userID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const data1 = await res1.json()
                console.log(data1)
                userinfo({
                    firstName: data.message.firstName,
                    chat_room_id: data1.chat_room_id
                })
                login(true)
                const socket = io.connect(process.env.REACT_APP_HOST)
                // console.log(socket)
                websocket(socket)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container className='align-items-center d-flex w-25' style={{ height: '100vh' }}>
            <Form onSubmit={handleSubmit} className='w-100'>
                <Form.Group >
                    <Form.Label>Enter your user name</Form.Label>
                    <Form.Control type='text' ref={refUserName} placeholder='Please enter your username' required />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Enter your password</Form.Label>
                    <Form.Control type='password' ref={refUserPass} required />
                </Form.Group>
                <Button className='mt-2' variant='primary' type='sumbit'>
                    submit
                </Button>
            </Form>
        </Container>
    )
}

export default Login