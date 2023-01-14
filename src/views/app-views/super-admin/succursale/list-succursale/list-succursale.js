import React, {useState, useEffect} from 'react'
import { Card, Table, Select, Input, Button, Badge, Menu } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";
import utils from 'utils';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const { Option } = Select

const getStockStatus = stockCount => {
	if(stockCount >= 10) {
		return <><Badge status="success" /><span>In Stock</span></>
	}
	if(stockCount < 10 && stockCount > 0) {
		return <><Badge status="warning" /><span>Limited Stock</span></>
	}
	if(stockCount === 0) {
		return <><Badge status="error" /><span>Out of Stock</span></>
	}
	return null
}

const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices']

const SuccursaleList = () => {
	let history = useHistory();
	const [list, setList] = useState(ProductListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	// let navigate = useNavigate(); 
	// const routeChange = () =>{ 
	// 	let path = `/app/admin/technician/add-technician`; 
	// 	navigate(path);
	// }

	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() => deleteRow(row)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	
	const addSuccursale = () => {
		history.push(`/app/super-admin/succursale/add-succursale`)
	}
	
	const viewDetails = row => {
		history.push(`/app/apps/ecommerce/edit-product/${row.id}`)
	}
	
	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if(selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				setList(data)
				setSelectedRows([])
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			setList(data)
		}
	}

	const tableColumns = [
		{
			title: 'ID',
			dataIndex: 'id',
			key:'id'
		},
		{
			title: 'Name',
			dataIndex: 'nom',
			key:'nom'
		},
		{
			title: 'Adresse',
			dataIndex: 'adresse',
			key:'adresse'
		},
		{
			title: 'Chef',
			dataIndex: 'chef',
			key:'chef'
		},
		{
			title: 'Service',
			dataIndex: 'service',
			key:'service'
		},
		{
			title: 'Action',
			dataIndex: '',
			render: (text, succursale) => (
			  <Button onClick={() => handleDelete(succursale.nom)}>Delete</Button>
			),
		  },
		
		// {
		// 	title: 'Product',
		// 	dataIndex: 'name',
		// 	render: (_, record) => (
		// 		<div className="d-flex">
		// 			<AvatarStatus size={60} type="square" src={record.image} name={record.name}/>
		// 		</div>
		// 	),
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		// },
		// {
		// 	title: 'Category',
		// 	dataIndex: 'category',
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'category')
		// },
		// {
		// 	title: 'Price',
		// 	dataIndex: 'price',
		// 	render: price => (
		// 		<div>
		// 			<NumberFormat
		// 				displayType={'text'} 
		// 				value={(Math.round(price * 100) / 100).toFixed(2)} 
		// 				prefix={'$'} 
		// 				thousandSeparator={true} 
		// 			/>
		// 		</div>
		// 	),
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
		// },
		// {
		// 	title: 'Stock',
		// 	dataIndex: 'stock',
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
		// },
		// {
		// 	title: 'Status',
		// 	dataIndex: 'stock',
		// 	render: stock => (
		// 		<Flex alignItems="center">{getStockStatus(stock)}</Flex>
		// 	),
		// 	sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
		// },
		
	];
	
	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : ProductListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	const handleShowCategory = value => {
		if(value !== 'All') {
			const key = 'category'
			const data = utils.filterArray(ProductListData, key, value)
			setList(data)
		} else {
			setList(ProductListData)
		}
	}
	const [succursales ,setSuccursales]=useState([])
	useEffect(()=>{
          loadSuccursale();
	},[]);
	const loadSuccursale=async()=>{
		const result =await axios.get("http://localhost:8090/api/v1/succursale/")
		setSuccursales(result.data.map(row=>({id:row.id,nom:row.nom,adresse:row.adresse,chef:row.chef.username,service:row.service.reference})))
		console.log(result.data);
	};
	function handleDelete(nom) {
		// Make a DELETE request to the API endpoint for deleting the data
		axios.delete(`http://localhost:8090/api/v1/succursale/nom/${nom}`)
		  .then(response => {
			console.log(response);
			// If the request is successful, update the state to remove the deleted item
			// and re-render the table
			setSuccursales(succursales.filter(item => item.nom !== nom));
		  })
		  .catch(error => {
			console.log(error);
		  });
	  }

	return (
		<Card>
			<Flex alignItems="center" justifyContent="between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowCategory} 
							placeholder="Category"
						>
							<Option value="All">All</Option>
							{
								categories.map(elm => (
									<Option key={elm} value={elm}>{elm}</Option>
								))
							}
						</Select>
					</div>
				</Flex>
				<div>
					<Button onClick={addSuccursale} type="primary" icon={<PlusCircleOutlined />} block>Add Succursale</Button>
					{/* <Button onClick={routeChange} type="primary" icon={<PlusCircleOutlined />} block>Add technician</Button> */}
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={succursales} 
					rowKey='id' 
					rowSelection={{
						selectedRowKeys: selectedRowKeys,
						type: 'checkbox',
						preserveSelectedRowKeys: false,
						...rowSelection,
					}}
				/>
			</div>
		</Card>
	)
}

export default SuccursaleList