import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import { Tabs, Button, Input, Row, Col, Card, Form, Upload, InputNumber, message, Select, DatePicker, Popconfirm } from 'antd';
import { useHistory } from 'react-router-dom'
import SuccursaleService from 'services/SuccursaleService';
import RdvDispo from 'services/RdvDispo';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import moment from 'moment'
import CalendrierService from 'services/CalendrierService';
import { reference } from '@popperjs/core';
import { forEach } from 'lodash';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";


const { Option } = Select;

const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices']
const hours = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']
let list = []

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'

const BookingForm = props => {

    const events = []
    let event = []

    let history = useHistory()
    const formRef = React.createRef();

    const { mode = ADD, param } = props
    const [form] = Form.useForm();
    const [listTechniciens, setListTechniciens] = useState([{ 'nom': '', 'id': '', 'prenom': '', 'username': '' }])
    const [selectedUsername, setSelectedUsername] = useState('')
    const [heureDebut, setHeureDebut] = useState('')
    const [heureFin, setHeureFin] = useState('')
    const [date, setDate] = useState('')

    const [listServices, setListServices] = useState([{ 'reference': '', 'id': '' }])
    const [selectedReference, setSelectedReference] = useState('')
    const [succursale, setSuccursale] = useState('')
    const [isShown, setIsShown] = useState(false);
    const [rdvDispo, setRdvDispo] = useState([])
    const [isModal, setIdModal] = useState(false);
    const [id, setId] = useState('');
    const rdvs = []

    const onReset = () => {
        formRef.current.resetFields();
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8090/api/v1/service/");
            const newData = await response.json();
            setListServices(newData);
            console.log(listServices);
        };
        fetchData();
    }, []);

    const discard = () => {
        history.push(`/app/admin/technician/list-technician`)
    }

    const handleChange = (event) => {
        setSelectedReference(event);
        localStorage.setItem('serviceReference', event)
        setTimeout(function () {
            // getSuccursale();
            const fetchSuccursale = async () => {
                const response = await fetch(`http://localhost:8090/api/v1/succursale/service/reference/${localStorage.getItem('serviceReference')}`);
                const data = await response.json();
                setSuccursale(data['nom'])
                localStorage.setItem('selectedSuccursale', data['nom'])
                console.log(data);
            };
            fetchSuccursale();
        }, 2000);

        setTimeout(function () {
            setIsShown(current => !current);
        }, 500)
        setTimeout(function () {
            addEvents();
        }, 2000)
    }

    useEffect(() => {
        setTimeout(function () {
            getRdvDispo();
        }, 2000);
    }, [])

    function saveCalendrier() {
    }

    function getSuccursale() {
        SuccursaleService.getByService(selectedReference)
            .then((response) => {
                console.log(response)
                setSuccursale(response.data['nom'])
            })
            .catch((error) => console.log(error))
    }

    function getRdvDispo() {
        RdvDispo.getBySuccursale(localStorage.getItem('selectedSuccursale'))
            .then((res) => res.json())
            .then((data) => {
                data.forEach(e => {
                    event = {
                        title: 'BCH237',
                        start: e.start,
                        end: e.end,
                        id: e.id
                    }
                    events.push(event)
                })
                setRdvDispo(events)
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    function addEvents() {
        // rdvDispo.forEach(e => {
        //     event = {
        //         title: 'BCH237',
        //         start: e.start,
        //         end: e.end
        //     }
        //     events.push(event)
        // })
        // console.log(events)
        // console.log(rdvDispo)
    }

    function bookRdv() {
        // render: () => (
        //     <Popconfirm
        //         title="êtes-vous sûr?"
        //         onConfirm={cancel}
        //         onCancel={cancel}
        //         okText="Oui"
        //         cancelText="Non"
        //     >
        //         <Button>Delete</Button>
        //     </Popconfirm>
        // )
        setIdModal(true)
        console.log(isModal)
    }

    const renderModal = () => {
        if (isModal) {
            return <Popconfirm
                title="êtes-vous sûr?"
                onConfirm={cancel}
                onCancel={cancel}
                okText="Oui"
                cancelText="Non"
            >
                <Button>Delete</Button>
            </Popconfirm>;
        }
    }

    function cancel(e) {
        message.warning("Opération annulée");
    }

    let rendez_vous = {
        rendezVousDispo: {
            id: localStorage.getItem('bookedId')
        },
        client: {
            username: localStorage.getItem('role')
        }
    }

    function book() {
        setTimeout(function () {
            RdvDispo.book(rendez_vous).then((response) => {
                console.log(response)
                message.success(`Rendez-vous réservé avec succes`)
            }).catch((error) => console.log(error))
        }, 2000);
    }

    console.log(selectedReference + ' ' + succursale)
    console.log(rdvDispo)

    return (
        <>
            <Form
                layout="vertical"
                ref={formRef}
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                initialValues={{
                    heightUnit: 'cm',
                    widthUnit: 'cm',
                    weightUnit: 'kg'
                }}
            >
                <PageHeaderAlt className="border-bottom" overlap>
                    <div className="container">
                        <Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
                            <h2 className="mb-3">{mode === 'ADD' ? 'Prendre un rendez-vous' : `Edit Product`} </h2>
                            <div className="mb-3">
                                <Button className="mr-2" onClick={() => discard()}>Discard</Button>
                                <Button type="primary" htmlType="submit" onClick={() => saveCalendrier()}>
                                    {mode === 'ADD' ? 'Add' : `Save`}
                                </Button>
                            </div>
                        </Flex>
                    </div>
                </PageHeaderAlt>
                <div className="container">
                    <Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
                        <TabPane tab="General Information" key="1">
                            <Row gutter={16}>
                                <Col xs={24} sm={24} md={24}>
                                    <Card title="Basic Info">
                                        <Form.Item name="service" label="Service" >
                                            <Select className="w-100" placeholder="Service" value={selectedReference} onChange={handleChange}>
                                                <option value="">Choisir un service</option>
                                                {listServices.map(s => (//
                                                    <option value={s.reference} key={s.id} >{s.reference}</option>
                                                ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </Card>
                                </Col>
                                <Col xs={24} sm={24} md={24}>
                                    {isShown && (
                                        <FullCalendar
                                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                            headerToolbar={{
                                                left: 'prev,next today',
                                                center: 'title',
                                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                                            }}
                                            initialView='dayGridMonth'
                                            editable={true}
                                            selectable={true}
                                            selectMirror={true}
                                            dayMaxEvents={true}
                                            weekends={true}
                                            events={rdvDispo}
                                            eventClick={(e) => {
                                                // setId(e.event.id)
                                                localStorage.setItem('bookedId', e.event.id)
                                                console.log(rendez_vous)
                                                book()
                                            }}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </TabPane>
                    </Tabs>
                </div>
            </Form>
        </>
    )
}

export default BookingForm