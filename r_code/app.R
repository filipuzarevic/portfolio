library(rsconnect)
library(tidyverse)
library(janitor)
library(purrr)
library(stringr)
library(scales)
library(ggplot2)
library(ggfittext)
library(ggpubr)
library(shiny)
library(truncnorm)
library(shinyWidgets)

data_example <- read.csv("data_to_analyse.csv")

#you need to insert the path 

data_example$Complain_Num <- data_example$Complain

preddy_table_combined <- as.data.frame(cbind(
  preds = c("Income_pure_cat",
            "Year_Birth_pure_cat",
            "Education",
            "Marital_Status",
            "Kidhome",
            "Teenhome",
            "Recency_pure_cat",
            "NumWebVisitsMonth_pure",
            "Complain"),
  labels = c("Income",
             "Year of birth",
             "Education",
             "Marital status",
             "No. of children at home",
             "No. of teens at home",
             "No. of days since last purchase",
             "No. of monthly website visits",
             "Was a complaint made")))



mods_table <- as.data.frame(cbind(
  mods = c("Education",
           "Kidhome",
           "Teenhome"),
  labels = c("Education",
             "No. of children at home",
             "No. of teens at home"
  )))


DVs_ordered <- as.data.frame(cbind(dv=c("MntWines",
                                        "MntFruits",
                                        "MntMeatProducts",
                                        "MntFishProducts",
                                        "MntSweetProducts",
                                        "MntGoldProds",
                                        "NumDealsPurchases",
                                        "NumCatalogPurchases",
                                        "Complain"),
                                   dv_label=c("Amount spent on: Wines",
                                              "Amount spent on: Fruits",
                                              "Amount spent on: Meat",
                                              "Amount spent on: Fish",
                                              "Amount spent on: Sweet",
                                              "Amount spent on: Gold",
                                              "No. of purchases made with deals",
                                              "No. of purchases made through catalogs",
                                              "Was a complaint made")))

DVs_ordered

data_example[mods_table$mods] <- lapply(data_example[mods_table$mods],as.factor)

rename_list <- setNames(c(preddy_table_combined$preds,DVs_ordered$dv), c(preddy_table_combined$labels, DVs_ordered$dv_label))
rename_list

data_example <- data_example %>%
  rename(!!!rename_list)

colnames(data_example)


binary_outcome_table <- function(df, iv, dv, output1 = 0) {
  overall_mean <- mean(df[[dv]],na.rm=T)
  tt<- df %>%
    dplyr::group_by(!!sym(iv)) %>%
    dplyr::summarise(
      n = n(),
      prop=mean(!!sym(dv),na.rm = T),
      outc=round(mean(!!sym(dv),na.rm = T)*100,1),
      ME= 100*(1.96 * sqrt(prop*(1-prop)/(n))),
      low = 100*prop-ME,
      high = 100*prop+ME,
      sum = sum(n()),
      values = paste (outc, "%",sep="")
    ) %>% 
    ungroup() %>% 
    mutate(sum = sum(n),
           number_x = scales::rescale(n/sum(n), to = c(0.3,1)),
           krs = paste(!!sym(iv),"\n", "n = ",n, sep = ""),
           overall_mean = overall_mean*100,
           dv = dv,
           iv = iv)
  if (output1 ==0) {
    return(tt)
  } 
  
  else{
    tp <- tt[,c(1,9,2,6,7)]
    tp <- tp %>%
      rename(
        !!paste("% of people buying", dv) := !!colnames(tp)[2],
        "n" := !!colnames(tp)[3],
        "lower CI" := !!colnames(tp)[4],
        "upper CI" := !!colnames(tp)[5])
    return(tp)
  }
  
}

single_group_chart <- function(tabby, outcome){
  iv <- tabby[["iv"]][1]
  dv <- tabby[["dv"]][1]
  gn <- ggplot(na.omit(tabby), 
               aes(x = krs, y = outc))+
    geom_col(fill="#1EA891", color = "#3A3B3C", alpha = na.omit(tabby)[["number_x"]])+
    geom_errorbar(aes(ymin = low, ymax = high), position = position_dodge(0.9), width = 0.1, color="black")+
    geom_bar_text(aes(label = values), color = "black", vjust = 1.5)+
    labs(y= paste(dv,outcome), x = iv) +
    geom_hline(yintercept=mean(tabby[["overall_mean"]], na.rm=T), linetype="dashed", color = "red",lwd=1.5)+
    theme(
      # Hide panel borders and remove grid lines
      panel.border = element_blank(),
      panel.grid.major = element_blank(),
      panel.grid.minor = element_blank(),
      # Change axis line
      axis.line = element_line(colour = "black")
    )+
    theme_classic()
  
  return(gn)
}




binary_outcome_mod_table <- function(df, iv, dv, mod, output1=0) {
  overall_mean <- mean(df[[dv]],na.rm=T)
  tt<- df %>%
    dplyr::group_by(!!sym(iv),!!sym(mod)) %>%
    dplyr::summarise(
      n = n(),
      prop=mean(!!sym(dv),na.rm = T),
      outc=round(mean(!!sym(dv),na.rm = T)*100,1),
      ME= 100*(1.96 * sqrt(prop*(1-prop)/(n))),
      low = 100*prop-ME,
      high = 100*prop+ME,
      sum = sum(n()),
      values = paste (outc, "%",sep="")
    ) %>% 
    ungroup() %>% 
    mutate(sum = sum(n),
           number_x = scales::rescale(n/sum(n), to = c(0.3,1)),
           krs = paste(!!sym(iv),"\n", "n = ",n, sep = ""),
           overall_mean = overall_mean*100,
           dv = dv,
           iv = iv,
           mod = mod)
  if(output1 == 0){
    return(tt)  
  } else {
    tp <- tt[,c(1,2,10,3,7,8)]
    tp <- tp %>%
      rename(
        !!paste("% of people buying", dv) := !!colnames(tp)[3],
        "n" := !!colnames(tp)[4],
        "lower CI" := !!colnames(tp)[5],
        "upper CI" := !!colnames(tp)[6])
    return(tp)
  }
  
}

moderated_chart_cat_mod <- function(tabby, outcome){
  iv <- tabby[["iv"]][1]
  dv <- tabby[["dv"]][1]
  mod <- tabby[["mod"]][1]
  
  max_val <- max(tabby[["high"]]) 
  new_max <- max_val + (0.05 * max_val)
  
  
  dodge <- position_dodge(width = 0.8) 
  
  
  gn <- ggplot(na.omit(tabby), 
               aes(x = !!sym(iv), y = outc, fill = !!sym(mod), group = !!sym(mod)))+
    geom_col(position = dodge, width = 0.7) +
    geom_errorbar(aes(ymin = low, ymax = high), 
                  position = dodge, width = 0.25, color = "black") +
    geom_text(aes(label = values), position = position_dodge(width = 0.8), color = "black", vjust = 1.5) + 
    coord_cartesian(ylim = c(0, new_max)) +
    labs(y= paste(dv,outcome), x = iv) +
    geom_hline(yintercept=mean(tabby[["overall_mean"]], na.rm=T), linetype="dashed", color = "red",lwd=1.5)+
    theme(
      # Hide panel borders and remove grid lines
      panel.border = element_blank(),
      panel.grid.major = element_blank(),
      panel.grid.minor = element_blank(),
      # Change axis line
      axis.line = element_line(colour = "black")
    )+
    theme_classic()
  
  return(gn)
}

continuous_outcome_table <- function(df, iv, dv, output1 = 0) {
  overall_mean <- mean(df[[dv]],na.rm=T)
  tt <- df %>%
    dplyr::group_by(!!sym(iv)) %>%
    dplyr::summarise(
      n = n(),
      outc = mean(!!sym(dv),na.rm = T),
      sd = sd(!!sym(dv),na.rm = T),
      se = sd/sqrt(n),
      low = outc - qt(1 - (0.05 / 2), n - 1) * se,
      high = outc + qt(1 - (0.05 / 2), n - 1) * se,
      string_mean = as.character(round(outc, 2)),
      values = round(outc,2)) %>% 
    ungroup() %>% 
    mutate(number_x = scales::rescale(100 * n / sum(n), to = c(0.3, 1)),
           krs = paste(!!sym(iv),"\n", "n = ",n, sep = ""),      
           krs = factor(krs, levels = unique(krs)),
           overall_mean = overall_mean,
           dv = dv,
           iv = iv)
  if (output1==0) {
    return(tt)
  } else {
    tp <- tt[,c(1,3,4,2,6,7)]
    tp <- tp %>%
      rename(
        !!paste("Arithmetic mean of ", dv) := !!colnames(tp)[2],
        "Standard deviation" := !!colnames(tp)[3],
        "lower CI" := !!colnames(tp)[5],
        "upper CI" := !!colnames(tp)[6]
      )
    return(tp)
  }
  
}




continuous_outcome_mod_table <- function(df, iv, dv, mod, output1 = 0) {
  overall_mean <- mean(df[[dv]],na.rm=T)
  tt <- df %>%
    dplyr::group_by(!!sym(iv),,!!sym(mod)) %>%
    dplyr::summarise(
      n = n(),
      outc = mean(!!sym(dv),na.rm = T),
      sd = sd(!!sym(dv),na.rm = T),
      se = sd/sqrt(n),
      low = outc - qt(1 - (0.05 / 2), n - 1) * se,
      high = outc + qt(1 - (0.05 / 2), n - 1) * se,
      string_mean = as.character(round(outc, 2)),
      values = round(outc,2)) %>% 
    ungroup() %>% 
    mutate(number_x = scales::rescale(100 * n / sum(n), to = c(0.3, 1)),
           krs = paste(!!sym(iv),"\n", "n = ",n, sep = ""),      
           krs = factor(krs, levels = unique(krs)),
           overall_mean = overall_mean,
           dv = dv,
           iv = iv,
           mod = mod)
  if (output1==0) {
    return(tt)
  } else {
    tp <- tt[,c(1,2,4,5,3,7,8)]
    tp <- tp %>%
      rename(
        !!paste("Arithmetic mean of ", dv) := !!colnames(tp)[3],
        "Standard deviation" := !!colnames(tp)[4],
        "n" := !!colnames(tp)[5],
        "lower CI" := !!colnames(tp)[6],
        "upper CI" := !!colnames(tp)[7]
      )
    return(tp)
  }
}

moderated_chart_cont_mod <- function(tabby, outcome){
  iv <- tabby[["iv"]][1]
  dv <- tabby[["dv"]][1]
  mod <- tabby[["mod"]][1]
  
  
  max_val <- max(tabby[["high"]])
  new_max <- max_val + (0.05 * max_val)
  
  gn <- ggplot(na.omit(tabby), 
               aes(x = !!sym(iv), y = outc, colour = !!sym(mod), group = !!sym(mod))) +
    geom_point() + geom_line(size = 1) +
    geom_ribbon(aes(ymin = low, ymax = high, fill = !!sym(mod)), 
                linetype = 2, alpha = 0.1) +
    labs(y= paste(dv,outcome), x = iv) +
    geom_hline(yintercept=mean(tabby[["overall_mean"]], na.rm=T), linetype="dashed", color = "red",lwd=1.5)+
    theme(
      # Hide panel borders and remove grid lines
      panel.border = element_blank(),
      panel.grid.major = element_blank(),
      panel.grid.minor = element_blank(),
      # Change axis line
      axis.line = element_line(colour = "black")
    )+
    theme_classic()
  
  return(gn)
}







#Shiny graphs
ui <- fluidPage(
  title = "ProfitPatterns",  # This sets the browser tab title
  titlePanel(h4('ProfitPatterns App', align = "center")),
  sidebarLayout(
    sidebarPanel(uiOutput('select_predictor'),
                 uiOutput('select_product'),
                 uiOutput('select_mod'),
                 # radioButtons(inputId = "angle",
                 #              label = "Rotate the labels on x axis",
                 #              c(0,45,90),
                 #              inline = T),
                 radioButtons(inputId = "filter_choice", label = "Do you want to use filters on the data?", 
                              choices = c("Yes" = "yes", "No" = "no"), selected = "no"),
                 
                 # Conditional panels that show up if the user selects "Yes"
                 conditionalPanel(
                   condition = "input.filter_choice == 'yes'",
                   uiOutput('select_filter'),
                   uiOutput('filter')
                 ),
                 actionButton(inputId = "btn_run_analysis",label = HTML("<strong>Run the analysis</strong>")),
                 hr(),
                 actionButton("show_help", "Info"),
                 width = 2),
    mainPanel(
      tabsetPanel(
        tabPanel("Chart", plotOutput(outputId = "graph")),
        tabPanel("Table",downloadButton(outputId = "downloadTable", label = "Download Table as .csv"),  # Add this line
                 tableOutput("table"),
                 # textOutput(outputId = "text"),
                 width = 8))
    )
  )
) 



server <- function (input, output) {
  
  data <- data_example
  filtered_data<-
    #
    reactive({
      # Use the full dataset if 'No' is selected for filters or if filter_choice is not interacted with
      if (is.null(input$filter_choice) || input$filter_choice == 'no') {
        return(data)
      } else {
        req(input$select_filter)
        return(data %>% filter(data[[input$select_filter]] %in% input$filter))
      }
    })
  
  categories_product <- (DVs_ordered$dv_label)
  categories_pred <- (preddy_table_combined$labels)
  categories_mod <- c("NONE",mods_table$labels)
  
  
  output$select_predictor <- renderUI({
    pickerInput("select_predictor", "Select the customer predictor",
                choices = levels(as.factor(categories_pred))
    )
  })
  
  output$select_product <- renderUI({
    pickerInput("select_product", "Select the outcome you want to focus on",
                choices = levels(as.factor(categories_product))
    )
  })
  
  output$select_mod <- renderUI({
    pickerInput("select_mod", "Select the moderator",
                choices = levels(as.factor(categories_mod)),
                selected="NONE"
    )
  })
  
  output$select_filter <- renderUI({
    pickerInput("select_filter", "Select the filter variable",
                choices = levels(as.factor(categories_pred))
    )
  })
  
  output$filter <- renderUI({
    pickerInput("filter", "Select the filter categories",
                choices = unique (data[,input$select_filter]),
                options = list ('actions-box'=TRUE), multiple = TRUE,
                selected = unique (data[,input$select_filter])
    )
  })
  
  
  # output graph
  reactive_graph <- eventReactive(input$btn_run_analysis,{
    
    df_local <- req(filtered_data())
    u_predictor <- req(input$select_predictor)
    u_product <- req(input$select_product)
    mod_local <- req(input$select_mod)
    
    if (is.null(mod_local) | mod_local == "NONE") {
      if(max(df_local[[u_product]],na.rm=T)==1){
        tabby <- binary_outcome_table(df = df_local,
                                      iv = u_predictor,
                                      dv = u_product)
        outc <- "%"
      }else {
        tabby <- continuous_outcome_table(df = df_local,
                                          iv = u_predictor,
                                          dv = u_product)
        outc = "Average"
      }
      
      single_group_chart(tabby = tabby,
                         outcome = outc)
      
    } else {  # If mod (moderator) is provided, use approach
      if(max(df_local[[u_product]],na.rm=T)==1){
        tabby <- binary_outcome_mod_table (df = df_local,
                                           iv = u_predictor,
                                           dv = u_product,
                                           mod = mod_local)
        
      }else {
        tabby <- continuous_outcome_mod_table (df = df_local,
                                               iv = u_predictor,
                                               dv = u_product,
                                               mod = mod_local)
      }
      if (is.character(df_local[[u_predictor]]) == F) {
        moderated_chart_cont_mod(tabby = tabby,
                                 outcome = "%")}
      
      else {
        moderated_chart_cat_mod(tabby = tabby,
                                outcome = "Average")}
    }
    
    
  })
  
  output$graph <- renderPlot({
    reactive_graph()
  })
  
  
  tbl_react <- eventReactive(input$btn_run_analysis, {
    
    saved_table <- reactive({df_local <- req(filtered_data())
    u_predictor <- req(input$select_predictor)
    u_product <- req(input$select_product)
    mod_local <- req(input$select_mod)
    
    
    if (is.null(mod_local) | mod_local == "NONE") {
      if(max(df_local[[u_product]],na.rm=T)==1){
        binary_outcome_table(df = df_local,
                             iv = u_predictor,
                             dv = u_product,
                             output1 = 99)
      }else {
        continuous_outcome_table(df = df_local,
                                 iv = u_predictor,
                                 dv = u_product,
                                 output1 = 99)
      }
    } else {  # If mod (moderator) is provided, use approach
      if(max(df_local[[u_product]],na.rm=T)==1){
        
        binary_outcome_mod_table (df = df_local,
                                  iv = u_predictor,
                                  dv = u_product,
                                  mod = mod_local,
                                  output1 = 99)
      }else {
        continuous_outcome_mod_table (df = df_local,
                                      iv = u_predictor,
                                      dv = u_product,
                                      mod = mod_local,
                                      output1 = 99)
      }
    }
    
    })
    return(saved_table())
  })
  
  output$table <- renderTable({
    tbl_react()
  })
  
  
  output$downloadTable <- downloadHandler(
    filename = function() {
      paste("data-", Sys.Date(), ".csv", sep="")
    },
    content = function(file) {
      write.csv(saved_table(), file)
    },
    contentType = "text/csv"
  )
  
  observeEvent(input$show_help, {
    showModal(modalDialog(
      title = "Info",
      HTML("<div>
    <h3>Welcome to ProfitPatterns</h3>
    <p>A specialized app designed to unravel complex relationships between customer parameters and key business outcomes. This tool empowers users to dive deep into data, uncovering crucial insights that drive business strategy.</p>
    <h4>Key Features:</h4>
    <ul>
        <li><strong>Dynamic Analysis</strong>: Explore how different customer characteristics relate to outcomes. Shading of the columns indicates the segment size.</li>
        <li><strong>Subgroup Exploration</strong>: Utilize filters and moderators to dissect data across various subgroups, offering tailored insights.</li>

    </ul>
    <p>This version serves as a showcase of what the app can do, utilizing open-source data for demonstration. The data can be accessed <a href='https://www.kaggle.com/datasets/vishakhdapat/customer-segmentation-clustering?resource=download' target='_blank'>here</a>.</p>
    <p>Read more about me <a href='https://www.simpli-fi.me/about' target='_blank'>here</a>.</p>
</div>"),
      easyClose = TRUE,
      footer = NULL
    ))
  })
  
  
}



shinyApp (ui= ui, server = server)

