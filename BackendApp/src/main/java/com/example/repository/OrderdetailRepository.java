package com.example.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.OrderDetail;

public interface OrderdetailRepository extends JpaRepository<OrderDetail, Integer> {
	/**
	 * Method find order by id
	 * 
	 * @param orderId This value to be find
	 * @return
	 */
	@Query("SELECT o FROM OrderDetail o WHERE o.objOrder.id=:orderId")
	List<OrderDetail> findByOrderId(@Param("orderId") Integer orderId);

	/**
	 * Method find order detail of product , customer (check exist) order to review
	 * 
	 * @param customerId
	 * @param productId
	 * @return
	 */
	@Query(value = "select * from Orderdetail join Orders on Orders.id= Orderdetail.orderid where Orderdetail.bookid=:productId and Orders.accountid=:customerId", nativeQuery = true)
	List<OrderDetail> findByOrderProduct(@Param("customerId") Integer customerId,
			@Param("productId") Integer productId);

	/**
	 * Method get hot product by order
	 * 
	 * @return
	 */
	@Query(value = "SELECT TOP 4 SUM(Orderdetail.quantity) as totalQuantity,Orderdetail.bookid from Orderdetail,Book where Book.id=Orderdetail.bookid group by "
			+ "Orderdetail.bookid  order by totalQuantity desc", nativeQuery = true)
	List<Map<Integer, Integer>> getHotProduct();

}
