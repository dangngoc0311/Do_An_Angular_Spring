package com.example.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.model.Book;

public interface BookRepository extends PagingAndSortingRepository<Book, Integer> {

	Book findBookById(Integer id);

	/**
	 * Method delete book
	 * 
	 * @param id This value to be find
	 */
	@Transactional
	void deleteBookById(Integer id);

	/**
	 * Method search book by name with pagination
	 * 
	 * @param name This value to be find
	 * @param page
	 * @return
	 */
	@Query("SELECT b FROM Book b WHERE b.name LIKE %:name%")
	Page<Book> findBookByName(@Param("name") String name, Pageable page);

	/**
	 * Method find book by category with pagination
	 * 
	 * @param cateId This value to be find
	 * @param page
	 * @return
	 */
	@Query(value = "SELECT b FROM Book b WHERE b.objCategory.id=:cateId")
	Page<Book> getBookByCategoryId(@Param("cateId") Integer cateId, Pageable page);

	/**
	 * Method find book by price range with pagination
	 * 
	 * @param min  This value is the minimum price to find
	 * @param max  This value is the maximum price to find
	 * @param page
	 * @return
	 */
	@Query(value = "SELECT * FROM Book WHERE price BETWEEN :min AND :max", nativeQuery = true)
	Page<Book> selectBookByPrice(@Param("min") Double min, @Param("max") Double max, Pageable page);

	/**
	 * Method get 2 new book
	 * 
	 * @return
	 */
	@Query(value = "SELECT TOP(2) * FROM Book ORDER BY id DESC", nativeQuery = true)
	List<Book> findNewBook();

	/**
	 * Method get related book
	 * 
	 * @param cateId This value to be find
	 * @param id     This value to be find
	 * @param star   This value is 0 offset
	 * @param end    This value is 4 limit
	 * @return
	 */
	@Query(value = "SELECT * FROM Book WHERE categoryid=:cateId AND id!=:id ORDER BY id OFFSET :star ROWS FETCH NEXT :end ROWS ONLY  ", nativeQuery = true)
	List<Book> relatedBook(@Param("cateId") Integer cateId, @Param("id") Integer id, @Param("star") Integer star,
			@Param("end") Integer end);

	/**
	 * Method find book by price and category and pagination
	 * 
	 * @param cateId This value to be find
	 * @param min    This value is the minimum price to find
	 * @param max    This value is the maximum price to find
	 * @param page
	 * @return
	 */

	@Query(value = "SELECT * FROM Book  WHERE price BETWEEN :min AND :max AND categoryid=:cateId", nativeQuery = true)
	Page<Book> selectBookByPriceCate(@Param("cateId") Integer cateId, @Param("min") Double min,
			@Param("max") Double max, Pageable page);

	/**
	 * Method find book by category and name with pagination
	 * 
	 * @param cateId This value is category to be find
	 * @param name   This value to be find
	 * @param page
	 * @return
	 */

	@Query(value = "SELECT * FROM Book  WHERE name like %:searchValue% AND categoryid=:cateId", nativeQuery = true)
	Page<Book> selectBookByCateSearch(@Param("cateId") Integer cateId, @Param("searchValue") String name,
			Pageable page);

	/**
	 * Method find book by name and price with pagination
	 * 
	 * @param min  This value is the minimum price to find
	 * @param max  This value is the maximum price to find
	 * @param name This value to be find
	 * @param page
	 * @return
	 */

	@Query(value = "SELECT * FROM Book  WHERE price BETWEEN :min AND :max AND name like %:searchValue% ", nativeQuery = true)
	Page<Book> selectBookByNamePrice(@Param("min") Double min, @Param("max") Double max,
			@Param("searchValue") String name, Pageable page);

	/**
	 * Method find book by all condition
	 * 
	 * @param cateId This value is category to be find
	 * @param name   This value to be find
	 * @param min    This value is the minimum price to find
	 * @param max    This value is the maximum price to find
	 * @param page
	 * @return
	 */

	@Query(value = "SELECT * FROM Book  WHERE price BETWEEN :min AND :max AND categoryid=:cateId AND name like %:searchValue%", nativeQuery = true)
	Page<Book> selectBookByAllCondition(@Param("cateId") Integer cateId, @Param("searchValue") String name,
			@Param("min") Double min, @Param("max") Double max, Pageable page);

}
