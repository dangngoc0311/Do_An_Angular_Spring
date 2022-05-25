package com.example.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Category;

public interface CategoryRepository extends PagingAndSortingRepository<Category, Integer> {
	@Transactional
	/**
	 * Method delete category
	 * 
	 * @param id This value to be find
	 */
	void deleteCategoryById(Integer id);

	/**
	 * Method find category by id
	 * 
	 * @param id
	 * @return
	 */
	Category findCategoryById(Integer id);

	/**
	 * Method find category by name with pagination
	 * 
	 * @param searchValue This value to be find
	 * @param page
	 * @return
	 */
	@Query("SELECT c FROM Category c WHERE name LIKE %:searchValue%")
	Page<Category> findCategoryByName(@Param("searchValue") String searchValue, Pageable page);

	/**
	 * Method find category by status=1
	 * 
	 * @return
	 */
	@Query(value = "SELECT * FROM Category WHERE status=1", nativeQuery = true)
	List<Category> findCategoryByStatus();

}
