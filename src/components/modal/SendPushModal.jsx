import React from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {FaTimes} from 'react-icons/fa'
import {modalType, validation, validationText} from '../../utils/app-constants'
import {errorMsg, successMsg} from "../../constants/msgs.js";
import {useForm} from "react-hook-form";
import ThemeInput from "../input/ThemeInput.jsx";
import ThemeSpinner from "../general/ThemeSpinner.jsx";
import {useCreatePushNotificationsMutation} from "../../store/apis/userApi.js";

const SendPushModal = ({size, isOpen, setIsOpen, selectedIds}) => {
    const [createNotifications, { isLoading }] = useCreatePushNotificationsMutation()

    const {register, reset, control, handleSubmit, watch, formState: {errors}} = useForm({mode: 'onChange'})

    const onSubmit = async (formData) => {
        let body = {
            selectedIds: selectedIds,
            title: formData?.title,
            message: formData?.message
        }
        const { data, error } = await createNotifications(body)
        if (data) {
            successMsg(data.message)
            reset()
            setIsOpen(false)
        }
        else {
            errorMsg(error.data.message)
        }
    }
    return (
        <Modal
            className='theme-modal'
            show={isOpen}
            onHide={() => setIsOpen({type: null, open: false})}
            size={'md'}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <header className="header d-flex align-items-center justify-content-between">
                <h3 className='text-black fw-700'>Send Push Notification</h3>
                <div className="box cursor" onClick={() => setIsOpen(false)}>
                    <FaTimes/>
                </div>
            </header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ThemeInput
                        name='title'
                        control={control}
                        errors={errors}
                        rules={{
                            required: {
                                value: true,
                                message: validationText.titleRequired
                            }
                        }}
                        label="Title"
                        placeholder="Enter your title"
                        type="text"
                    />
                    <ThemeInput
                        name='message'
                        control={control}
                        errors={errors}
                        rules={{
                            required: {
                                value: true,
                                message: validationText.messageRequired
                            }
                        }}
                        label="Message"
                        placeholder="Enter your message"
                        type="text"
                    />
                    <Button type="submit" disabled={isLoading} className="btn-solid btn-purple w-100 mt-3">
                        {isLoading ? <ThemeSpinner /> : 'Submit'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SendPushModal