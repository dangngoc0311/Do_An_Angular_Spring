package com.example.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.OrderDetail;
import com.example.repository.OrderdetailRepository;

@Service
public class OrderdetailService {
	private final OrderdetailRepository orderdetailRepository;

	@Autowired
	public OrderdetailService(OrderdetailRepository orderdetailRepository) {
		this.orderdetailRepository = orderdetailRepository;
	}

	/**
	 * Method insert order detail
	 * 
	 * @param orderdetail
	 * @return
	 */
	public OrderDetail addOrderdetail(OrderDetail orderdetail) {
		return orderdetailRepository.save(orderdetail);

	}

	/**
	 * Method get list order detail by order id
	 * 
	 * @param orderId This value is order id to be find
	 * @return
	 */
	public List<OrderDetail> getAllOrderDetailByOrder(Integer orderId) {
		return orderdetailRepository.findByOrderId(orderId);
	}

	/**
	 * Method check exits order (to review)
	 * 
	 * @param customerId This value is account id to be find
	 * @param productId  This value is product id to be find
	 * @return
	 */
	public List<OrderDetail> checkExistOrderProduct(Integer customerId, Integer productId) {
		return orderdetailRepository.findByOrderProduct(customerId, productId);
	}

	/**
	 * Method get hot product by order
	 * 
	 * @return
	 */
	public List<Map<Integer, Integer>> getHotPruduct() {
		return orderdetailRepository.getHotProduct();
	}
}
