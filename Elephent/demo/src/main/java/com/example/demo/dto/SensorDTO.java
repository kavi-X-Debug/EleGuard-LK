package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class SensorDTO {

    private String section_id;
    private String season;
    private String moon_phase;
    private String crop_type;
    private String crop_maturity_stage;
    private int hour_of_day;
    private int night;
    private double temperature_c;
    private double l_last_24h_mm;
    private int days_to_harvest;
    private int water_canal_present;
    private int forest_distance_m;
    private int riggered_last_1hr;
    private int triggered_last_6hrs;
    private boolean s_last_7days;
    private boolean ection_triggered_yesterday;
    private int closest_detection_last_24h_m;
    private double _risk_score_last_week;
    private double neighbor_max_risk_score;
    private boolean neighbor_any_triggered_1hr;
    private int inutes_since_last_trigger;
    private double ecay_factor;
    private int amplitude;
    private boolean crossedBoundary;
    private boolean falseAlarm;
    private boolean isActive;
    private String sensorId;
    private String severity;
    private int threatRadius;
    private String timestamp;

    public String getSection_id() {
        return section_id;
    }

    public void setSection_id(String section_id) {
        this.section_id = section_id;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getMoon_phase() {
        return moon_phase;
    }

    public void setMoon_phase(String moon_phase) {
        this.moon_phase = moon_phase;
    }

    public String getCrop_type() {
        return crop_type;
    }

    public void setCrop_type(String crop_type) {
        this.crop_type = crop_type;
    }

    public String getCrop_maturity_stage() {
        return crop_maturity_stage;
    }

    public void setCrop_maturity_stage(String crop_maturity_stage) {
        this.crop_maturity_stage = crop_maturity_stage;
    }

    public int getHour_of_day() {
        return hour_of_day;
    }

    public void setHour_of_day(int hour_of_day) {
        this.hour_of_day = hour_of_day;
    }

    public int getNight() {
        return night;
    }

    public void setNight(int night) {
        this.night = night;
    }

    public double getTemperature_c() {
        return temperature_c;
    }

    public void setTemperature_c(double temperature_c) {
        this.temperature_c = temperature_c;
    }

    public double getL_last_24h_mm() {
        return l_last_24h_mm;
    }

    public void setL_last_24h_mm(double l_last_24h_mm) {
        this.l_last_24h_mm = l_last_24h_mm;
    }

    public int getDays_to_harvest() {
        return days_to_harvest;
    }

    public void setDays_to_harvest(int days_to_harvest) {
        this.days_to_harvest = days_to_harvest;
    }

    public int getWater_canal_present() {
        return water_canal_present;
    }

    public void setWater_canal_present(int water_canal_present) {
        this.water_canal_present = water_canal_present;
    }

    public int getForest_distance_m() {
        return forest_distance_m;
    }

    public void setForest_distance_m(int forest_distance_m) {
        this.forest_distance_m = forest_distance_m;
    }

    public int getRiggered_last_1hr() {
        return riggered_last_1hr;
    }

    public void setRiggered_last_1hr(int riggered_last_1hr) {
        this.riggered_last_1hr = riggered_last_1hr;
    }

    public int getTriggered_last_6hrs() {
        return triggered_last_6hrs;
    }

    public void setTriggered_last_6hrs(int triggered_last_6hrs) {
        this.triggered_last_6hrs = triggered_last_6hrs;
    }

    public boolean isS_last_7days() {
        return s_last_7days;
    }

    public void setS_last_7days(boolean s_last_7days) {
        this.s_last_7days = s_last_7days;
    }

    public boolean isEction_triggered_yesterday() {
        return ection_triggered_yesterday;
    }

    public void setEction_triggered_yesterday(boolean ection_triggered_yesterday) {
        this.ection_triggered_yesterday = ection_triggered_yesterday;
    }

    public int getClosest_detection_last_24h_m() {
        return closest_detection_last_24h_m;
    }

    public void setClosest_detection_last_24h_m(int closest_detection_last_24h_m) {
        this.closest_detection_last_24h_m = closest_detection_last_24h_m;
    }

    public double get_risk_score_last_week() {
        return _risk_score_last_week;
    }

    public void set_risk_score_last_week(double _risk_score_last_week) {
        this._risk_score_last_week = _risk_score_last_week;
    }

    public double getNeighbor_max_risk_score() {
        return neighbor_max_risk_score;
    }

    public void setNeighbor_max_risk_score(double neighbor_max_risk_score) {
        this.neighbor_max_risk_score = neighbor_max_risk_score;
    }

    public boolean isNeighbor_any_triggered_1hr() {
        return neighbor_any_triggered_1hr;
    }

    public void setNeighbor_any_triggered_1hr(boolean neighbor_any_triggered_1hr) {
        this.neighbor_any_triggered_1hr = neighbor_any_triggered_1hr;
    }

    public int getInutes_since_last_trigger() {
        return inutes_since_last_trigger;
    }

    public void setInutes_since_last_trigger(int inutes_since_last_trigger) {
        this.inutes_since_last_trigger = inutes_since_last_trigger;
    }

    public double getEcay_factor() {
        return ecay_factor;
    }

    public void setEcay_factor(double ecay_factor) {
        this.ecay_factor = ecay_factor;
    }

    public int getAmplitude() {
        return amplitude;
    }

    public void setAmplitude(int amplitude) {
        this.amplitude = amplitude;
    }

    public boolean isCrossedBoundary() {
        return crossedBoundary;
    }

    public void setCrossedBoundary(boolean crossedBoundary) {
        this.crossedBoundary = crossedBoundary;
    }

    public boolean isFalseAlarm() {
        return falseAlarm;
    }

    public void setFalseAlarm(boolean falseAlarm) {
        this.falseAlarm = falseAlarm;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getSensorId() {
        return sensorId;
    }

    public void setSensorId(String sensorId) {
        this.sensorId = sensorId;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public int getThreatRadius() {
        return threatRadius;
    }

    public void setThreatRadius(int threatRadius) {
        this.threatRadius = threatRadius;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
