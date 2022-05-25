package com.example.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Category;
import com.example.service.CategoryService;

@RestController
@RequestMapping("/admin/category")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class CategoryController {
	private final CategoryService categoryService;

	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}

	/**
	 * The method return list category
	 * 
	 * @param pageNumber  This value is the page number
	 * @param pageSize    This value is the size of one page
	 * @param searchValue This value to be find
	 * @param sortColumn  This value is the sort column name
	 * @param sortOrder   This value is sort type
	 * @return
	 */
	@GetMapping("/listCategory")
	public ResponseEntity<Page<Category>> getAllCategory(
			@RequestParam(name = "pageNumber", required = false, defaultValue = "0") Integer pageNumber,
			@RequestParam(name = "pageSize", required = false, defaultValue = "3") Integer pageSize,
			@RequestParam(name = "searchValue", required = false) String searchValue,
			@RequestParam(name = "sortColumn", required = false, defaultValue = "id") String sortColumn,
			@RequestParam(name = "sortOrder", defaultValue = "DESC", required = false) String sortOrder) {
		Page<Category> categories = categoryService.getAllCategories(searchValue, pageNumber, pageSize, sortColumn,
				sortOrder);
		return new ResponseEntity<>(categories, HttpStatus.OK);

	}

	/**
	 * The method return category find by id
	 * 
	 * @param id The value to be find
	 * @return
	 */
	@GetMapping("/findCategory/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable("id") Integer id) {
		Category category = categoryService.findCategoryById(id);
		return new ResponseEntity<>(category, HttpStatus.OK);
	}

	/**
	 * The method return category to be inserted
	 * 
	 * @param category The value to be inserted
	 * @return
	 */
	@PostMapping("/insertCategory")
	public ResponseEntity<Category> insertCategory(@RequestBody Category category) {
		Category cate = categoryService.addCategory(category);
		return new ResponseEntity<>(cate, HttpStatus.OK);
	}

	/**
	 * The method return category to be updated
	 * 
	 * @param id       The value is category id
	 * @param category The value to be updated
	 * @return
	 */
	@PutMapping("/updateCategory/{id}")
	public ResponseEntity<Category> updateCategory(@PathVariable("id") Integer id, @RequestBody Category category) {
		Category cateUp = categoryService.findCategoryById(id);
		cateUp.setName(category.getName());
		cateUp.setStatus(category.getStatus());
		Category updateCate = categoryService.updateCategory(cateUp);
		return new ResponseEntity<>(updateCate, HttpStatus.OK);
	}

	/**
	 * The method return category to be deleted
	 * 
	 * @param id The value to be find
	 * @return
	 */
	@DeleteMapping("/deleteCategory/{id}")
	public ResponseEntity<?> deleteCategory(@PathVariable("id") Integer id) {
		categoryService.deleteCategory(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	/**
	 * The method return list category where status =1
	 * 
	 * @return
	 */
	@GetMapping("/getCategoryByStatus")
	public ResponseEntity<List<Category>> getCategoryByStatus() {
		List<Category> category = categoryService.getCategoryByStatus();
		return new ResponseEntity<>(category, HttpStatus.OK);
	}
}
