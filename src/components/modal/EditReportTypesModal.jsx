import React, {useEffect} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {FaTimes} from 'react-icons/fa'
import {modalType, validation, validationText} from '../../utils/app-constants'
import {errorMsg, successMsg} from "../../constants/msgs.js";
import {useForm} from "react-hook-form";
import ThemeInput from "../input/ThemeInput.jsx";
import ThemeSpinner from "../general/ThemeSpinner.jsx";
import {useUpdateReportsMutation} from "../../store/apis/reportApi.js";

const EditReportTypesModal = ({selectedData, size, isOpen, setIsOpen, refetch}) => {
    const [updateReport, {isLoading}] = useUpdateReportsMutation()

    console.log(selectedData, "dsdfs")
    const {register, reset, control, handleSubmit, watch, formState: {errors}} = useForm({mode: 'onChange'})

    useEffect(() => {
        reset({
            text: selectedData?.text,
        })
    }, [selectedData])
    const onSubmit = async (formData) => {
        const {data, error} = await updateReport({data: formData, id: selectedData?._id})
        if (data) {
            successMsg(data.message)
            refetch()
            setIsOpen({type: null, open: false})
            reset()
        } else {
            errorMsg(error.data.message)
        }
    }
    return (
        <Modal
            className='theme-modal'
            show={isOpen?.open && isOpen?.type == modalType.edit}
            onHide={() => setIsOpen({type: null, open: false})}
            size={'md'}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <header className="header d-flex align-items-center justify-content-between">
                <h3 className='text-black fw-700'>Edit Report Type</h3>
                <div className="box cursor" onClick={() => setIsOpen(false)}>
                    <FaTimes/>
                </div>
            </header>

            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <ThemeInput
                        name='text'
                        control={control}
                        errors={errors}
                        rules={{
                            required: {
                                value: true,
                                message: validationText.questionRequired
                            }
                        }}
                        label="Report Type"
                        placeholder="Enter your report types"
                        type="text"
                    />
                    <Button type="submit" disabled={isLoading} className="btn-solid btn-purple w-100 mt-3">
                        {isLoading ? <ThemeSpinner/> : 'Submit'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditReportTypesModal