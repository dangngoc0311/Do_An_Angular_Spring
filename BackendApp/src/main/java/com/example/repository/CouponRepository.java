package com.example.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Coupon;

public interface CouponRepository extends PagingAndSortingRepository<Coupon, Integer> {

	Coupon findCouponById(Integer id);

	/**
	 * Method delete coupon
	 * 
	 * @param id This value to be find
	 */
	@Transactional
	void deleteCouponById(Integer id);

	/**
	 * Method find expired coupon of user
	 * 
	 * @param accId This value to be find
	 * @return
	 */
	@Query(value = "SELECT DISTINCT c.* FROM Coupon c left join Usercoupon u on c.id = u.couponid Where c.status !=0 and c.id NOT IN (SELECT couponid FROM Usercoupon where accountid=:accId)", nativeQuery = true)
	List<Coupon> findAllCouponExpired(@Param("accId") Integer accId);

	/**
	 * Method find coupon by name with pagination
	 * 
	 * @param searchValue This value to be find
	 * @param page
	 * @return
	 */
	@Query("SELECT c FROM Coupon c WHERE name LIKE %:searchValue%")
	Page<Coupon> findCouponByName(@Param("searchValue") String searchValue, Pageable page);

}
