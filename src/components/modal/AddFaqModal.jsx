import React from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {FaTimes} from 'react-icons/fa'
import {modalType, validation, validationText} from '../../utils/app-constants'
import {errorMsg, successMsg} from "../../constants/msgs.js";
import {useForm} from "react-hook-form";
import ThemeInput from "../input/ThemeInput.jsx";
import ThemeSpinner from "../general/ThemeSpinner.jsx";
import {useCreateFaqsMutation} from "../../store/apis/faqApi.js";

const AddFaqModal = ({size, isOpen, setIsOpen, refetch}) => {
    const [createFaq, { isLoading }] = useCreateFaqsMutation()

    const {register, reset, control, handleSubmit, watch, formState: {errors}} = useForm({mode: 'onChange'})

    const onSubmit = async (formData) => {
        const { data, error } = await createFaq(formData)
        if (data) {
            successMsg(data.message)
            refetch()
            setIsOpen(false)
            reset()
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
                <h3 className='text-black fw-700'>Add Faq</h3>
                <div className="box cursor" onClick={() => setIsOpen(false)}>
                    <FaTimes/>
                </div>
            </header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ThemeInput
                        name='question'
                        control={control}
                        errors={errors}
                        rules={{
                            required: {
                                value: true,
                                message: validationText.questionRequired
                            }
                        }}
                        label="Question"
                        placeholder="Enter your question"
                        type="text"
                    />
                    <ThemeInput
                        name='answer'
                        control={control}
                        errors={errors}
                        rules={{
                            required: {
                                value: true,
                                message: validationText.answerRequired
                            }
                        }}
                        label="Answer"
                        placeholder="Enter your answer"
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

export default AddFaqModal