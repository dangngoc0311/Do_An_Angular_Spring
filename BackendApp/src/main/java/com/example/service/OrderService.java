package com.example.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.example.model.Orders;
import com.example.repository.OrderRepository;

@Service
public class OrderService {
	private final OrderRepository orderRepository;

	@Autowired
	public OrderService(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}

	/**
	 * Method insert order
	 * 
	 * @param order
	 * @return
	 */
	public Orders addOrder(Orders order) {
		return orderRepository.save(order);
	}

	/**
	 * Method update order
	 * 
	 * @param order
	 * @return
	 */
	public Orders updateOrder(Orders order) {
		return orderRepository.save(order);
	}

	/**
	 * Method get list order with pagination
	 * 
	 * @param searchValue This value is name to be find
	 * @param pageNumber  This value is the page number
	 * @param pageSize    This value is the size of one page
	 * @param sortColumn  This value is the sort column name
	 * @param sortOrder   This value is sort type
	 * @return
	 */
	public Page<Orders> getAllOrder(String searchValue, int pageNumber, int pageSize, String sortColumn,
			String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return orderRepository.getAllOrderByName(searchValue, page);
	}

	/**
	 * Method find order by id
	 * 
	 * @param id
	 * @return
	 */
	public Orders findOrdersById(Integer id) {
		return orderRepository.findOrderById(id);
	}

	/**
	 * Method order by account id
	 * 
	 * @param customerId This value is account id to be find
	 * @return
	 */
	public List<Orders> findOrdersByCustomer(Integer customerId) {
		return orderRepository.findOrdersByCustomer(customerId);
	}

	/**
	 * Method get monthly income
	 * 
	 * @return
	 */
	public List<Map<Integer, Float>> getOrderMonth() {
		return orderRepository.getOrderMonth();
	}

}
