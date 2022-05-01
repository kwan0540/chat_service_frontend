import React, { useRef, useState } from 'react'
import { Form, InputGroup, Button, Container, Row, Col } from 'react-bootstrap'

function Chat({ ws, getText, userinfo }) {
    const messRef = useRef()
    let y = 0
    // const [text, setText] = useState()
    const postText = (e) => {
        e.preventDefault()
        console.log(userinfo)
        const message = {
            user: userinfo.firstName,
            message: messRef.current.value,
            chat_room_id: userinfo.chat_room_id
        }
        console.log(message)
        ws.emit('createMessage', message)
    }
    return (
        <div style={{
            position: 'relative',
            top: '20px',
            display: 'flex',
            flexDirection: 'column',
            height: '200px',
            justifyContent: 'space-between'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column-reverse',
                flexGrow: '2',
                overflow: 'scroll',
                paddingLeft: '15px',
                paddingRight: '15px'
            }}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {getText.map(x => <div className='my-1 d-flex flex-column' key={y++}>
                        <div>
                            {x.sender}:
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div>{x.message}</div> <div style={{fontSize: 'xx-small', paddingLeft: '10px'}}>{x.time}</div>
                        </div>
                    </div>)}
                </div>
            </div>
            <Form onSubmit={postText}>
                <Form.Group className='m-2'>
                    <InputGroup>
                        <Form.Control as='textarea' ref={messRef} required  style={{ height: '10px', resize: 'none' }}/>
                        <Button type='submit'>send</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>

    )
}

export default Chat