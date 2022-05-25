package com.example.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.model.Category;
import com.example.repository.CategoryRepository;

@Service
public class CategoryService {
	private final CategoryRepository categoryRepository;

	@Autowired
	public CategoryService(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	public Category addCategory(Category category) {
		return categoryRepository.save(category);

	}

	/**
	 * Method get list category with pagination
	 * 
	 * @param searchValue This value is name to be find
	 * @param pageNumber  This value is the page number
	 * @param pageSize    This value is the size of one page
	 * @param sortColumn  This value is the sort column name
	 * @param sortOrder   This value is sort type
	 * @return
	 */
	public Page<Category> getAllCategories(String searchValue, int pageNumber, int pageSize, String sortColumn,
			String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return categoryRepository.findCategoryByName(searchValue, page);
	}

	/**
	 * Method update category
	 * 
	 * @param category
	 * @return
	 */
	public Category updateCategory(Category category) {
		return categoryRepository.save(category);
	}

	/**
	 * Method find category by id
	 * 
	 * @param id This value to be find
	 * @return
	 */
	public Category findCategoryById(Integer id) {
		return categoryRepository.findCategoryById(id);
	}

	/**
	 * Method delete category
	 * 
	 * @param id
	 */
	public void deleteCategory(Integer id) {
		categoryRepository.deleteCategoryById(id);
	}

	/**
	 * Method get list category by all condition ( by name)
	 * 
	 * @param name       This value is name to be find
	 * @param pageNumber This value is the page number
	 * @param pageSize   This value is the size of one page
	 * @param sortColumn This value is the sort column name
	 * @param sortOrder  This value is sort type
	 * @return
	 */
	public Page<Category> getCategoryByName(String name, int pageNumber, int pageSize, String sortColumn,
			String sortOrder) {
		Sort sort = null;
		if (sortOrder.equals("DESC")) {
			sort = Sort.by(Sort.Direction.DESC, sortColumn);
		} else if (sortOrder.equals("ASC")) {
			sort = Sort.by(Sort.Direction.ASC, sortColumn);
		}
		Pageable page = PageRequest.of(pageNumber, pageSize, sort);
		return categoryRepository.findCategoryByName(name, page);
	}

	/**
	 * Method get list category where status =1
	 * 
	 * @return
	 */
	public List<Category> getCategoryByStatus() {
		return categoryRepository.findCategoryByStatus();
	}
}
