package com.example.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.model.OrderDetail;
import com.example.service.OrderdetailService;

@RestController
@RequestMapping("/orderDetail")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class OrderdetailController {

	private final OrderdetailService orderdetailService;

	public OrderdetailController(OrderdetailService orderdetailService) {
		this.orderdetailService = orderdetailService;
	}
/**
 * The method return order detail to be insert
 * @param orderDetail The value to be insert 
 * @return
 */
	@PostMapping("/insertOrderDetail")
	public ResponseEntity<OrderDetail> insertOrderDetail(@RequestBody OrderDetail orderDetail) {
		OrderDetail ord = orderdetailService.addOrderdetail(orderDetail);
		return new ResponseEntity<>(ord, HttpStatus.OK);
	}
/**
 * The method return list order detail of order
 * @param id This value to be find
 * @return
 */
	@GetMapping("/listOrderDetail/{id}")
	public ResponseEntity<List<OrderDetail>> getOrderDetailByOrder(@PathVariable("id") Integer id) {
		List<OrderDetail> listOrderDetail = orderdetailService.getAllOrderDetailByOrder(id);
		return new ResponseEntity<>(listOrderDetail, HttpStatus.OK);
	}
/**
 * The method check exist order of product
 * @param customerId This value to be find
 * @param productId This value to be find
 * @return
 */
	@GetMapping("/checkExistOrderProduct/{customerId}/{productId}")
	public ResponseEntity<List<OrderDetail>> checkExistOrderProduct(@PathVariable("customerId") Integer customerId,
			@PathVariable("productId") Integer productId) {
		List<OrderDetail> ord = orderdetailService.checkExistOrderProduct(customerId, productId);
		return new ResponseEntity<>(ord, HttpStatus.OK);
	}

	/**
	 * 
	 * @return
	 */
	@GetMapping("/getHotProduct")
	public ResponseEntity<List<?>> getHotProduct() {
		List<?> list = orderdetailService.getHotPruduct();
		return new ResponseEntity<>(list, HttpStatus.OK);
	}
}
