package com.beimi.web.service.repository.es;

import java.util.List;

import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;

import com.beimi.web.model.Subsidy;

public abstract interface SubsidyESRepository extends ElasticsearchCrudRepository<Subsidy, String>
{
	public abstract Subsidy findByIdAndOrgi(String id ,String orgi);
	
	public abstract List<Subsidy> findByPlayeridAndOrgi(String playerid ,String orgi);
	
	public abstract int countByPlayeridAndOrgiAndDay(String playerid ,String orgi , String day);
}
