exports.findActionValue = (dataItem, actionType) => {
    if (!dataItem.actions || !Array.isArray(dataItem.actions) || dataItem.actions.length === 0) {
      return 0;
    }
  
    var totalValue = 0;
  
    if (actionType === "offsite_conversions") {
      var regex = /^offsite_conversion\./;
      for (var j = 0; j < dataItem.actions.length; j++) {
        if (regex.test(dataItem.actions[j].action_type)) {
          totalValue += Number(dataItem.actions[j].value);
        }
      }
    } else {
      for (var j = 0; j < dataItem.actions.length; j++) {
        if (dataItem.actions[j].action_type === actionType) {
          totalValue += Number(dataItem.actions[j].value);
        }
      }
    }
  
    return totalValue;
  };
  
  exports.findCostPerActionValue = (dataItem, actionType) => {
    if (!dataItem.cost_per_action_type || !Array.isArray(dataItem.cost_per_action_type) || dataItem.cost_per_action_type.length === 0) {
      return 0;
    }
  
    var totalValue = 0;
  
    if (actionType === "offsite_conversions") {
      var regex = /^offsite_conversion\./;
      for (var j = 0; j < dataItem.cost_per_action_type.length; j++) {
        if (regex.test(dataItem.cost_per_action_type[j].action_type)) {
          totalValue += Number(dataItem.cost_per_action_type[j].value);
        }
      }
    } else {
      for (var j = 0; j < dataItem.cost_per_action_type.length; j++) {
        if (dataItem.cost_per_action_type[j].action_type === actionType) {
          totalValue += Number(dataItem.cost_per_action_type[j].value);
        }
      }
    }
  
    return totalValue;
  };

exports.findPostInsightsDataValue = (dataItem, insightName) => {
    if (!dataItem.insights || !Array.isArray(dataItem.insights.data) || dataItem.insights.data.length === 0) {
        return 0;
    }

    const insight = dataItem.insights.data.find(i => i.name === insightName);
    return insight ? Number(insight.values[0].value) : 0;
};

exports.findPostActionDataSummaryTotalCount = (dataItem, actionName) => {
    if (!dataItem[actionName] || !dataItem[actionName].summary) {
        return 0;
    }

    return Number(dataItem[actionName].summary.total_count);
};

exports.findPostActionDataCount = (dataItem, actionName) => {
  if (!dataItem[actionName]) {
      return 0;
  }

  return Number(dataItem[actionName].count);
};

exports.replaceInvalidUTF8Characters = (text) => {
  return text.replace(/[^\x00-\x7F\u0105\u0104\u0119\u0118\u015B\u015A\u0107\u0106\u017C\u017B\u017A\u0179\u00F3\u00D3\u0142\u0141\u0144\u0143]/g, "");
}