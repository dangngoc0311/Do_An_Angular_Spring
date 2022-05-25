package com.example.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.ReviewBook;

public interface ReviewBookRepository extends JpaRepository<ReviewBook, Integer> {
	/**
	 * Method find review by id
	 * 
	 * @param id
	 * @return
	 */
	ReviewBook findReviewBookById(Integer id);

	/**
	 * Method find review active of product
	 * 
	 * @param proId This value is product id to be find
	 * @return
	 */
	@Query("SELECT bk FROM ReviewBook bk WHERE bk.objBookReview.id=:proId AND bk.status=1")
	List<ReviewBook> findReviewBookByProductIdWithStatus(@Param("proId") Integer proId);

	/**
	 * Method check exist review of product , customer (check exist)
	 * 
	 * @param customerId This value is account id to be find
	 * @param proId      This value is product id to be find
	 * @return
	 */
	@Query("SELECT bk FROM ReviewBook bk WHERE bk.objBookReview.id=:proId AND bk.objReviewBook.id=:customerId")
	ReviewBook checkExistReview(@Param("customerId") Integer customerId, @Param("proId") Integer proId);

	/**
	 * Method find account by name with pagination
	 * 
	 * @param searchValue This value to be find
	 * @param page
	 * @return
	 */
	@Query(value = "SELECT ReviewBook.* FROM ReviewBook,Account,Book  where Account.id=ReviewBook.accountid and Book.id=ReviewBook.bookid and (Account.name like  %:searchValue% or Book.name like %:searchValue%)", nativeQuery = true)
	Page<ReviewBook> getReviewByName(@Param("searchValue") String searchValue, Pageable page);

	/**
	 * Method find review of product ( find by product id)
	 * 
	 * @param proId This value is product id to be find
	 * @return
	 */
	@Query("SELECT bk FROM ReviewBook bk WHERE bk.objBookReview.id=:proId")
	List<ReviewBook> findReviewBookByProductId(@Param("proId") Integer proId);

	/**
	 * Method find list review of account(find by account) with pagination
	 * 
	 * @param customerId This value is account id to be find
	 * @param page
	 * @return
	 */
	@Query("SELECT bk FROM ReviewBook bk WHERE bk.objReviewBook.id=:customerId")
	Page<ReviewBook> getAllReviewByUser(@Param("customerId") Integer customerId, Pageable page);

}
