package com.example.wbdvsp2102yiyahe6projectserverjava.services;

import com.example.wbdvsp2102yiyahe6projectserverjava.models.Widget;
import com.example.wbdvsp2102yiyahe6projectserverjava.repositories.WidgetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {
    @Autowired
    WidgetRepository repository;
    
    public Widget createWidgetForTopic(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        return repository.save(widget);
    }
    
    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);

    }

    public Integer deleteWidget(Long id) {
        repository.deleteById(id);
        return 1;
    }

    public Integer updateWidget(Long id, Widget widget) {
        Widget originalWidget = repository.findById(id).get();
        if (originalWidget != null) {
            if (widget.getTopicId() != null)  originalWidget.setTopicId(widget.getTopicId());
            if (widget.getType() != null) originalWidget.setType(widget.getType());
            if (widget.getSize() != null) originalWidget.setSize(widget.getSize());
            if (widget.getText() != null) originalWidget.setText(widget.getText());
            if (widget.getWidth() != null) originalWidget.setWidth(widget.getWidth());
            if (widget.getHeight() != null) originalWidget.setHeight(widget.getHeight());
            if (widget.getSrc() != null) originalWidget.setSrc(widget.getSrc());
            if (widget.getOrdered() != null) originalWidget.setOrdered(widget.getOrdered());

            repository.save(originalWidget);
        }
        return 1;
    }
}
