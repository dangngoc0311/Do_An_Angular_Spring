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

import com.example.model.ReviewBook;
import com.example.service.ReviewbookService;

@RestController
@RequestMapping("/reviewBook")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class ReviewbookController {
	private final ReviewbookService reviewbookService;

	public ReviewbookController(ReviewbookService reviewbookService) {
		this.reviewbookService = reviewbookService;
	}

	/**
	 * The method return review to be insert
	 * 
	 * @param reviewBook The value to be insert
	 * @return
	 */
	@PostMapping("/insertReviewBook")
	public ResponseEntity<ReviewBook> insertReviewBook(@RequestBody ReviewBook reviewBook) {
		ReviewBook rv = reviewbookService.addReview(reviewBook);
		return new ResponseEntity<>(rv, HttpStatus.OK);
	}

	/**
	 * The method return review to be update
	 * 
	 * @param id         This value to be find
	 * @param reviewBook The value to be update
	 * @return
	 */
	@PutMapping("/updateReviewBook/{id}")
	public ResponseEntity<ReviewBook> updateReviewBook(@PathVariable("id") Integer id,
			@RequestBody ReviewBook reviewBook) {
		ReviewBook rv = reviewbookService.findReviewbookById(id);
		rv.setObjBookReview(reviewBook.getObjBookReview());
		rv.setObjReviewBook(reviewBook.getObjReviewBook());
		rv.setRating(reviewBook.getRating());
		rv.setStatus(reviewBook.getStatus());
		rv.setDescription(reviewBook.getDescription());
		rv.setReviewdate(reviewBook.getReviewdate());
		ReviewBook rvs = reviewbookService.updateReview(reviewBook);
		return new ResponseEntity<>(rvs, HttpStatus.OK);
	}

	/**
	 * The method return list review
	 * 
	 * @param pageNumber  This value is the page number
	 * @param pageSize    This value is the size of one page
	 * @param searchValue This value to be find
	 * @param sortColumn  This value is the sort column name
	 * @param sortOrder   This value is sort type
	 * @return
	 */

	@GetMapping("/listReviewBook")
	public ResponseEntity<Page<ReviewBook>> getAllReviewBook(
			@RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
			@RequestParam(name = "pageSize", required = false, defaultValue = "3") Integer pageSize,
			@RequestParam(name = "searchValue", required = false) String searchValue,
			@RequestParam(name = "sortColumn", required = false, defaultValue = "id") String sortColumn,
			@RequestParam(name = "sortOrder", defaultValue = "DESC", required = false) String sortOrder) {
		Page<ReviewBook> rvs = reviewbookService.getAllReview(searchValue, pageNumber, pageSize, sortColumn, sortOrder);
		return new ResponseEntity<>(rvs, HttpStatus.OK);
	}

	/**
	 * The method return reviw by id
	 * 
	 * @param id This value to be find
	 * @return
	 */
	@GetMapping("/findReviewBookById/{id}")
	public ResponseEntity<ReviewBook> getCouponById(@PathVariable("id") Integer id) {
		ReviewBook r = reviewbookService.findReviewbookById(id);
		return new ResponseEntity<>(r, HttpStatus.OK);
	}

	/**
	 * The method return list review of product (CUSTOMER)
	 * 
	 * @param proId  This value to be find
	 * @param status
	 * @return
	 */
	@GetMapping("/findReviewBookByProduct/{proId}")
	public ResponseEntity<List<ReviewBook>> findReviewBookByProduct(@PathVariable("proId") Integer proId,
			@RequestParam(name = "status", required = false, defaultValue = "true") boolean status) {
		List<ReviewBook> r = reviewbookService.getReviewBookByProductWithStatus(proId);
		return new ResponseEntity<>(r, HttpStatus.OK);
	}

	/**
	 * The method return list review of book (ADMIN)
	 * 
	 * @param proId This value to be find
	 * @return
	 */
	@GetMapping("/findReviewBookByProductNoStatus/{proId}")
	public ResponseEntity<List<ReviewBook>> findReviewBookByProductNoStatus(@PathVariable("proId") Integer proId) {
		List<ReviewBook> r = reviewbookService.getReviewBookByProduct(proId);
		return new ResponseEntity<>(r, HttpStatus.OK);
	}

	/**
	 * The method check exist review of customer , product
	 * 
	 * @param customerId This value to be find
	 * @param proId      This value to be find
	 * @return
	 */
	@GetMapping("/checkExistReview/{customerId}/{proId}")
	public ResponseEntity<ReviewBook> checkExistReview(@PathVariable("customerId") Integer customerId,
			@PathVariable("proId") Integer proId) {
		ReviewBook r = reviewbookService.checkExistReview(customerId, proId);
		return new ResponseEntity<>(r, HttpStatus.OK);
	}

	/**
	 * The method return list review of user
	 * 
	 * @param customerId This value to be find
	 * @param pageNumber This value is the page number
	 * @param pageSize   This value is the size of one page
	 * @return
	 */
	@GetMapping("/listReviewBookByUser/{customerId}")
	public ResponseEntity<Page<ReviewBook>> getAllReviewByUser(@PathVariable("customerId") Integer customerId,
			@RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
			@RequestParam(name = "pageSize", required = false, defaultValue = "3") Integer pageSize) {
		Page<ReviewBook> rvs = reviewbookService.getAllReviewByUser(customerId, pageNumber, pageSize);
		return new ResponseEntity<>(rvs, HttpStatus.OK);
	}
}
