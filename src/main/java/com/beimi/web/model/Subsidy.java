package com.beimi.web.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.elasticsearch.annotations.Document;

import com.beimi.core.engine.game.Message;
import com.beimi.util.UKTools;
import com.beimi.util.event.UserEvent;

@Document(indexName = "beimi", type = "bm_game_subsidy")
@Entity
@Table(name = "bm_game_subsidy")
@org.hibernate.annotations.Proxy(lazy = false)
public class Subsidy implements UserEvent ,Message , java.io.Serializable{
	private static final long serialVersionUID = 1L;
    
	private String id = UKTools.getUUID();                   //主键
	
	private String command ;
	
	private String playerid;
	private String orgi ;
	private Date createtime ;
	private String gametype ;
	private String device;
	private int subsidy;
	private String day ;
	private String hour ;
	private String timeslot ;		//补贴时间段 ， 以后扩展备用
	private String subsidytype ;	//补贴类型  ， 以后扩展备用
	private int frequency ;			//当天第几次补贴 
	
	private String subsidyruleid ;	//补贴规则ID ， 以后扩展备用
	
	
	
	@Id
	@Column(length = 32)
	@GeneratedValue(generator = "system-uuid")
	@GenericGenerator(name = "system-uuid", strategy = "assigned")	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPlayerid() {
		return playerid;
	}
	public void setPlayerid(String playerid) {
		this.playerid = playerid;
	}
	public String getOrgi() {
		return orgi;
	}
	public void setOrgi(String orgi) {
		this.orgi = orgi;
	}
	public Date getCreatetime() {
		return createtime;
	}
	public void setCreatetime(Date createtime) {
		this.createtime = createtime;
	}
	public String getGametype() {
		return gametype;
	}
	public void setGametype(String gametype) {
		this.gametype = gametype;
	}
	public String getDevice() {
		return device;
	}
	public void setDevice(String device) {
		this.device = device;
	}
	public int getSubsidy() {
		return subsidy;
	}
	public void setSubsidy(int subsidy) {
		this.subsidy = subsidy;
	}
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public String getHour() {
		return hour;
	}
	public void setHour(String hour) {
		this.hour = hour;
	}
	public String getTimeslot() {
		return timeslot;
	}
	public void setTimeslot(String timeslot) {
		this.timeslot = timeslot;
	}
	public String getSubsidytype() {
		return subsidytype;
	}
	public void setSubsidytype(String subsidytype) {
		this.subsidytype = subsidytype;
	}
	public int getFrequency() {
		return frequency;
	}
	public void setFrequency(int frequency) {
		this.frequency = frequency;
	}
	public String getSubsidyruleid() {
		return subsidyruleid;
	}
	public void setSubsidyruleid(String subsidyruleid) {
		this.subsidyruleid = subsidyruleid;
	}
	public String getCommand() {
		return command;
	}
	public void setCommand(String command) {
		this.command = command;
	}
}
