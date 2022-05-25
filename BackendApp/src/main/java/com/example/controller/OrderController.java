package com.example.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.model.Orders;
import com.example.service.OrderService;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class OrderController {
	private final OrderService orderService;

	public OrderController(OrderService orderService) {
		this.orderService = orderService;
	}

	/**
	 * The method return the order to be inserted
	 * 
	 * @param order The value to be insert
	 * @return
	 */
	@PostMapping("/insertOrder")
	public ResponseEntity<Orders> insertOrder(@RequestBody Orders order) {
		Orders ord = orderService.addOrder(order);
		return new ResponseEntity<>(ord, HttpStatus.OK);
	}

	/**
	 * The method return the order to be update
	 * 
	 * @param id    This value to be find
	 * @param order The value to be update
	 * @return
	 */
	@PutMapping("/updateOrder/{id}")
	public ResponseEntity<Orders> insertOrder(@PathVariable("id") Integer id, @RequestBody Orders order) {
		Orders ord = orderService.findOrdersById(id);
		ord.setListOrderDetails(order.getListOrderDetails());
		ord.setNote(order.getNote());
		ord.setObjAccountOrder(order.getObjAccountOrder());
		ord.setObjOrderCoupon(order.getObjOrderCoupon());
		ord.setOrderdate(order.getOrderdate());
		ord.setSubtotalprice(order.getSubtotalprice());
		ord.setStatus(order.getStatus());
		ord.setAddress(order.getAddress());
		ord.setName(order.getName());
		ord.setPhone(order.getPhone());
		Orders ords = orderService.updateOrder(ord);
		return new ResponseEntity<>(ords, HttpStatus.OK);
	}

	/**
	 * The method return list order
	 * 
	 * @param pageNumber  This value is the page number
	 * @param pageSize    This value is the size of one page
	 * @param searchValue This value to be find
	 * @param sortColumn  This value is the sort column name
	 * @param sortOrder   This value is sort type
	 * @return
	 */
	@GetMapping("/admin/listOrder")
	public ResponseEntity<Page<Orders>> getAllOrders(
			@RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
			@RequestParam(name = "pageSize", required = false, defaultValue = "3") Integer pageSize,
			@RequestParam(name = "searchValue", required = false) String searchValue,
			@RequestParam(name = "sortColumn", required = false, defaultValue = "id") String sortColumn,
			@RequestParam(name = "sortOrder", defaultValue = "DESC", required = false) String sortOrder) {
		Page<Orders> listOrder = orderService.getAllOrder(searchValue, pageNumber, pageSize, sortColumn, sortOrder);
		return new ResponseEntity<>(listOrder, HttpStatus.OK);
	}

	/**
	 * The method return order by id
	 * 
	 * @param id This value to be find
	 * @return
	 */
	@GetMapping("/findOrderById/{id}")
	public ResponseEntity<Orders> getOrderById(@PathVariable("id") Integer id) {
		Orders or = orderService.findOrdersById(id);
		return new ResponseEntity<>(or, HttpStatus.OK);
	}

	/**
	 * The method return list order of user
	 * 
	 * @param customerId This value to be find
	 * @return
	 */
	@GetMapping("/findOrdersByCustomer/{customerId}")
	public ResponseEntity<List<Orders>> getOrderByAccount(@PathVariable("customerId") Integer customerId) {
		List<Orders> or = orderService.findOrdersByCustomer(customerId);
		return new ResponseEntity<>(or, HttpStatus.OK);
	}

	/**
	 * The method return monthly income
	 * 
	 * @return
	 */
	@GetMapping("/getOrderMonth")
	public ResponseEntity<List<?>> getOrderMonth() {
		List<?> list = orderService.getOrderMonth();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
}
