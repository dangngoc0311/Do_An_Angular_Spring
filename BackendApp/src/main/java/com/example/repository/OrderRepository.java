package com.example.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.example.model.Orders;

public interface OrderRepository extends PagingAndSortingRepository<Orders, Integer> {

	Orders findOrderById(Integer id);

	/**
	 * Method find list order by account
	 * 
	 * @param customerId This value to be find
	 * @return
	 */
	@Query(value = "SELECT * FROM Orders WHERE accountid =:customerId order by orderdate desc", nativeQuery = true)
	List<Orders> findOrdersByCustomer(@Param("customerId") Integer customerId);

	/**
	 * Method find list order by name with pagination
	 * 
	 * @param searchValue This value to be find
	 * @param page
	 * @return
	 */
	@Query(value = "SELECT c FROM Orders c WHERE c.name LIKE %:searchValue%")
	Page<Orders> getAllOrderByName(String searchValue, Pageable page);

	/**
	 * Method return monthly income
	 * 
	 * @return
	 */
	@Query(value = "select SUM(subtotalprice) as totalPrice,MONTH(orderdate) as months from Orders group by MONTH(orderdate)", nativeQuery = true)
	List<Map<Integer, Float>> getOrderMonth();

}
