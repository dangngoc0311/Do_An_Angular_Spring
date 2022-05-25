package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.UserCoupon;

public interface UsercouponRepository extends JpaRepository<UserCoupon, Integer> {
	/**
	 * Method find user coupon of account,coupon( check exits)
	 * 
	 * @param couponId This value is coupon id to be find
	 * @param userId   This value is account id to be find
	 * @return
	 */
	@Query(value = "select * from Usercoupon where accountid=:userId and couponid=:couponId ", nativeQuery = true)
	UserCoupon findUserCoupon(@Param("couponId") Integer couponId, @Param("userId") Integer userId);

	/**
	 * Method find list user coupon not used and expired of account (list coupon
	 * expired )
	 * 
	 * @param accountId This value is account id to be find
	 * @return
	 */
	@Query(value = "select DISTINCT UserCoupon.* from UserCoupon join Coupon on Coupon.id= Usercoupon.couponid where  UserCoupon.accountid=:accountId and Coupon.status!=0 and Usercoupon.status!=0", nativeQuery = true)
	List<UserCoupon> findListCouponUser(@Param("accountId") Integer accountId);

	/**
	 * Method find user coupon by id
	 * 
	 * @param id This value to be find
	 * @return
	 */
	UserCoupon findUserCouponById(Integer id);

}
