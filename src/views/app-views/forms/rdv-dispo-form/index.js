import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import Flex from 'components/shared-components/Flex'
import { Tabs, Button, Input, Row, Col, Card, Form, Upload, InputNumber, message, Select, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import CalendrierService from 'services/CalendrierService';
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

const RDVForm = props => {

	let history = useHistory()
	const formRef = React.createRef();

	const { mode = ADD, param } = props
	const [form] = Form.useForm();
	const [listTechniciens, setListTechniciens] = useState([{ 'nom': '', 'id': '', 'prenom': '', 'username': '' }])
	const [selectedUsername, setSelectedUsername] = useState('')
	const [heureDebut, setHeureDebut] = useState('')
	const [heureFin, setHeureFin] = useState('')
	const [date, setDate] = useState('')

	const onReset = () => {
		formRef.current.resetFields();
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:8090/api/v1/technicien/");
			const newData = await response.json();
			setListTechniciens(newData);
			console.log(listTechniciens);
		};
		fetchData();
	}, []);

	const discard = () => {
		history.push(`/app/admin/technician/list-technician`)
	}

	const handleChange = (event) => {
		setSelectedUsername(event);
	}

	const rdv = {
		start: heureDebut,
		end: heureFin,
		date: moment(date['_d']).format(),
		technicien: {
			username: selectedUsername
		}
	}

	console.log(rdv)
	console.log(moment().format())

	function saveCalendrier() {
		CalendrierService.saveCalendrier(rdv)
			.then((response) => {
				console.log(response)
				message.success(`Success`);
				onReset()
			})
			.catch((error) => console.log(error))
	}

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
							<h2 className="mb-3">{mode === 'ADD' ? 'Generer les rendez-vous disponibles' : `Edit Product`} </h2>
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
								<Col xs={24} sm={24} md={17}>
									<Card title="Basic Info">

										<Form.Item name="date" label="Date" >
											<DatePicker onChange={(e) => setDate(e)} />
											{/* <DatePicker dateFormat="YYYY-MM-DD" onChange={(e) => setDate(e)} /> */}
											{/* <DatePicker selected={date} onChange={(e) => setDate(e)} /> */}
										</Form.Item>
										<Form.Item name="technicien" label="Technicien" >
											<Select className="w-100" placeholder="Category" value={selectedUsername} onChange={handleChange}>
												{listTechniciens.map(t => (//
													<option value={t.username} key={t.id} >{t.nom} {t.prenom}</option>
												))
												}
											</Select>
										</Form.Item>
										<Form.Item name="heureDebut" label="Heure Debut" >
											<Select className="w-100" placeholder="Heure Debut" value={heureDebut} onChange={(e) => setHeureDebut(e)}>
												{hours.map(h => (
													<option value={h} key={h} >{h}</option>
												))
												}
											</Select>
										</Form.Item>
										<Form.Item name="heureFin" label="Heure Fin" >
											<Select className="w-100" placeholder="Heure Fin" value={heureFin} onChange={(e) => setHeureFin(e)}>
												{hours.map(h => (
													<option value={h} key={h} >{h}</option>
												))
												}
											</Select>
										</Form.Item>
									</Card>
								</Col>
							</Row>
						</TabPane>
					</Tabs>
				</div>
			</Form>
		</>
	)
}

export default RDVForm
