window.addEventListener('DOMContentLoaded', (event) => {
    // Função para aumentar os preços dos produtos em 22% para pessoa jurídica
    // Função para aumentar os preços dos produtos em 22% para pessoa jurídica
    function updatePricesForBusiness() {
        var colorButtons = document.getElementsByClassName('color');
        for (var i = 0; i < colorButtons.length; i++) {
            var price = parseFloat(colorButtons[i].getAttribute('data-price'));
            price *= 1.22; // Aumentar o preço em 22%
            colorButtons[i].setAttribute('data-price', price.toFixed(2)); // Atualizar o preço no atributo data-price
            var colorName = colorButtons[i].innerText.replace(/€\s*\d+(\.\d{1,2})?/, '').trim(); // Remove original price from the color name
            colorButtons[i].innerText = colorName + '€' + price.toFixed(2); // Show the new price with two decimal places
        }
    
        var measureButtons = document.getElementsByClassName('measure');
        for (var i = 0; i < measureButtons.length; i++) {
            var price = parseFloat(measureButtons[i].getAttribute('data-price'));
            price *= 1.22; // Aumentar o preço em 22%
            measureButtons[i].setAttribute('data-price', price.toFixed(2)); // Atualizar o preço no atributo data-price
            var measureName = measureButtons[i].innerText.replace(/€\s*\d+(\.\d{1,2})?/, '').trim(); // Remove original price from the measure name
            measureButtons[i].innerText = measureName; // Show only measure name
        }
    }
    
    
    
    // Exibe o popup de boas-vindas
    document.getElementById('welcomePopup').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    
    document.getElementById('individualButton').addEventListener('click', function() {
        updatePricesForBusiness();
        document.getElementById('welcomePopup').style.display = 'none';
        document.body.style.overflow = '';
    });
    
    document.getElementById('businessButton').addEventListener('click', function() {
        document.getElementById('welcomePopup').style.display = 'none';
        document.body.style.overflow = '';
    });
    
    $(document).ready(function() {
        $('#menuIcon').click(function() {
          $('#sideMenu').removeClass('hide');
        });
      
        $('#closeButton').click(function() {
          $('#sideMenu').addClass('hide');
        });
      
        $('#viewOptions i').click(function() {
          $('#viewOptions i').removeClass('selected');
          $(this).addClass('selected');
          // Adicione aqui o código para mudar a exibição dos produtos
        });
      
        $('#categories .category').click(function() {
          $('#categories .category').removeClass('selected');
          $(this).addClass('selected');
          // Adicione aqui o código para mostrar apenas os produtos da categoria selecionada
        });
      });
      
      // Recupera itens do carrinho do localStorage
    let storedCart = JSON.parse(localStorage.getItem('cart') || "[]");
    let total = 0;
    if (storedCart.length > 0) {
        let cart = document.getElementById('cart');
        for (let cartItemHTML of storedCart) {
            let tempDiv = document.createElement('div');
            tempDiv.innerHTML = cartItemHTML;
            let cartItem = tempDiv.firstChild;

            let deleteButton = cartItem.querySelector('button');
            deleteButton.addEventListener('click', removeFromCart);

            cart.appendChild(cartItem);
            
            // Adiciona o preço do item ao total
            let priceElement = cartItem.querySelector('.product-info > span');
            let priceAndQuantity = priceElement.innerText.match(/€(\d+(\.\d{1,2})?) \* (\d+) unid = €(\d+(\.\d{1,2})?)/);
            let itemTotal = parseFloat(priceAndQuantity[4]);
            total += itemTotal;
        }
        
        var totalElement = document.getElementById('total');
        totalElement.innerText = total.toFixed(2);
    }

    // ... restante do código
});
    
    
    
    // Função para abrir o popup e preencher com as informações do produto
    // Função para abrir o popup e preencher com as informações do produto
    function openPopup(e) {
        var product = e.target.closest('.product');
        var color = e.target.getAttribute('data-color');
        var price = e.target.getAttribute('data-price');
        
        var popup = document.getElementById('popup');
        popup.getElementsByClassName('popup-product-name')[0].innerText = product.getElementsByClassName('product-name')[0].innerText;
        popup.getElementsByClassName('popup-color')[0].innerText = color + ': €' + price;
        var productImage = product.getElementsByTagName('img')[0];
        document.getElementById('popup-product-image').src = productImage.src;
        // Pega as divs de medidas da cor correta
       
        var sizes = product.querySelectorAll('.sizes[data-color="' + color + '"] > .size');
    
        // Remove as opções de medidas existentes no pop-up
        var popupSizes = popup.getElementsByClassName('popup-sizes')[0];
        while (popupSizes.firstChild) {
            popupSizes.removeChild(popupSizes.firstChild);
        }
    
      // Adiciona as opções de medidas corretas ao pop-up
      for (var i = 0; i < sizes.length; i++) {
        var sizeDiv = sizes[i].cloneNode(true);
    
        // Adiciona novamente os campos de entrada
        var measures = sizeDiv.querySelectorAll('.measure-container .measure');
        for (var j = 0; j < measures.length; j++) {
            // Verifica se já existe um campo de entrada ao lado da medida
            var nextSibling = measures[j].nextSibling;
            if (!nextSibling || nextSibling.nodeName.toLowerCase() !== 'input') {
                var input = document.createElement('input');
                input.type = 'number';
                input.min = '0';
                input.className = 'measure-quantity';
                measures[j].parentNode.insertBefore(input, measures[j].nextSibling);
            }
        }
    
        popupSizes.appendChild(sizeDiv);
    }
    
    
    popup.style.display = 'block';
    }
    
    let selectedSize = null;
    
    let initialViewportHeight = window.innerHeight;

window.addEventListener('resize', function() {
    let heightDifference = initialViewportHeight - window.innerHeight;
    let differenceInPercentage = (heightDifference / initialViewportHeight) * 100;

    if (differenceInPercentage > 20) {
        // A diferença de altura é maior do que 20%, o teclado provavelmente está aberto
        document.body.classList.add('keyboard-open');
    } else {
        // A diferença de altura é menor do que 20%, o teclado provavelmente está fechado
        document.body.classList.remove('keyboard-open');
    }
});

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('measure')) {
            // Remova a classe 'selected' de qualquer botão de medida anteriormente selecionado
            if (selectedSize) {
                selectedSize.classList.remove('selected');
            }
    
            // Adicione a classe 'selected' ao botão de medida atualmente selecionado
            event.target.classList.add('selected');
    
            // Atualize a variável selectedSize
            selectedSize = event.target;
        }
    });
    
    
    // Adicionar produto ao resumo da compra a partir do popup
    // Adicionar produto ao resumo da compra a partir do popup
function addToCartFromPopup() {
    var popup = document.getElementById('popup');
    var productName = popup.querySelector('.popup-product-name').innerText;
    var color = popup.querySelector('.popup-color').innerText.split(':')[0].trim();
    var productImage = popup.querySelector('.popup-product-image').src;

    var measures = popup.querySelectorAll('.measure');
    for (var i = 0; i < measures.length; i++) {
        var price = parseFloat(measures[i].getAttribute('data-price'));
        var quantity = parseInt(measures[i].nextElementSibling.value, 10);
        if (quantity > 0) {
            var measure = measures[i].innerText;
            var size = measures[i].closest('.size').querySelector('h4').innerText;

            var cart = document.getElementById('cart');
            var cartItem = document.createElement('p');

            var productImageElement = document.createElement('img');
            productImageElement.src = productImage;
            cartItem.appendChild(productImageElement);

            var productInfo = document.createElement('span');
            productInfo.className = 'product-info';
            productInfo.innerText = productName + ' ' + color + ' | ' + size + ' ' + measure;
            var priceElement = document.createElement('span');
            priceElement.innerText = '€' + price.toFixed(2) + ' * ' + quantity + ' unid = €' + (price * quantity).toFixed(2);
            productInfo.appendChild(document.createElement('br'));
            productInfo.appendChild(priceElement);
            cartItem.appendChild(productInfo);

            var deleteButton = document.createElement('button');
            deleteButton.innerText = 'X';
            deleteButton.addEventListener('click', removeFromCart);

            cartItem.appendChild(deleteButton);
            cart.appendChild(cartItem);

             // Atualizar carrinho no localStorage
             let storedCart = JSON.parse(localStorage.getItem('cart') || "[]");
             storedCart.push(cartItem.outerHTML);
             localStorage.setItem('cart', JSON.stringify(storedCart));
 
             var totalElement = document.getElementById('total');
             var total = parseFloat(totalElement.innerText);
             total += price * quantity;
             totalElement.innerText = total.toFixed(2);


            // Novo código para adicionar a div "Adicionado"
            var addedDiv = document.createElement('div');
            
            addedDiv.style.position = 'absolute';
            addedDiv.style.top = '0';
            addedDiv.style.left = '10';
            addedDiv.style.color = 'white';
            addedDiv.style.padding = '5px';
            addedDiv.style.zIndex = '100';
            addedDiv.className = 'added-banner';
            addedDiv.innerText = 'Adicionado';
            var product = document.querySelector(`img[src="${productImage}"]`).closest('.product');
            product.style.position = 'relative';
            product.appendChild(addedDiv);

            selectedSize = null;
        }
    }
    // Fechar o popup após adicionar o item ao carrinho
    closePopup();
    // Resetar o campo de quantidade para 1
}

    
    document.getElementById('popup-add').addEventListener('click', addToCartFromPopup);
    
    
    function removeFromCart(event) {
        var cartItem = event.target.parentNode;
        var priceElement = cartItem.querySelector('span');
        var priceAndQuantity = priceElement.innerText.match(/€(\d+(\.\d{1,2})?) \* (\d+) unid = €(\d+(\.\d{1,2})?)/);
        var price = parseFloat(priceAndQuantity[1]);
        var quantity = parseInt(priceAndQuantity[3]);
    
        var totalElement = document.getElementById('total');
        var total = parseFloat(totalElement.innerText);
        total -= price * quantity;
        totalElement.innerText = total.toFixed(2);
    
        cartItem.remove();
    }
    
    
    
    
    
    
    var colorButtons = document.getElementsByClassName('color');
    for (var i = 0; i < colorButtons.length; i++) {
        colorButtons[i].addEventListener('click', openPopup);
    }
    
    function closePopup() {
        var popup = document.getElementById('popup');
        popup.style.display = 'none';
    }
    
    document.getElementById('popup-close').addEventListener('click', closePopup);
    
    function getCartItemsText() {
        var cartItems = document.getElementById('cart').children;
        var cartItemsText = '';
        
        for (var i = 0; i < cartItems.length; i++) {
            var productInfo = cartItems[i].querySelector('.product-info').innerText;
            cartItemsText += productInfo + '\n\n'; // Adiciona uma linha extra em branco entre cada item
        }
        
        return cartItemsText;
    }
    
    
    
    document.getElementById('whatsappButton').addEventListener('click', function() {
        var cartItemsText = getCartItemsText();
        var totalValue = document.getElementById('total').innerText;
        var textToSend = "Resumo da Compra:\n" + cartItemsText + "Total: €" + totalValue;
        var phoneNumber = "393898986018"; // Substitua pelo número de telefone desejado
        var message = encodeURIComponent(textToSend);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`);
    });
    
    document.getElementById('copyButton').addEventListener('click', function() {
        var cartItemsText = getCartItemsText();
        var totalValue = document.getElementById('total').innerText;
        var textToCopy = "Resumo da Compra:\n" + cartItemsText + "Total: €" + totalValue;
        var tempInput = document.createElement('textarea');
        tempInput.style = "position: absolute; left: -1000px; top: -1000px";
        tempInput.value = textToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    // Mostra o texto "Copiado" por 3 segundos
    var copiedText = document.getElementById('copiedText');
    copiedText.innerText = "Copiado!";
    copiedText.style.visibility = "visible";
    
    setTimeout(function() {
        copiedText.style.visibility = "hidden";
    }, 3000);
});

    document.getElementById('clearCartButton').addEventListener('click', function() {
        if (confirm("Você deseja remover todos os produtos do carrinho?")) {
            var cart = document.getElementById('cart');
            while (cart.firstChild) {
                cart.firstChild.remove();
            }
            document.getElementById('total').innerText = '0';
            // Não esqueça de limpar o armazenamento local também
            localStorage.removeItem('cart');
        }
    });
    
    
let userLang = (navigator.language || navigator.userLanguage).substring(0, 2); 
//alert("O idioma do seu navegador é: " + userLang);
    
var enTranslations = {
    pageTitle: "My Piercing Italy",
    welcomeText: "Welcome!",
    individualText: "Individual",
    businessText: "Business",
    viewText: "Display:",
    categoriesText: "Categories",
    category1: "Best Sellers"
    // continue aqui para mais textos
  };
  
  var ptTranslations = {
    pageTitle: "My Piercing Italy",
    welcomeText: "Bem Vindo(a)!",
    individualText: "Pessoa Física",
    businessText: "Pessoa Jurídica",
    viewText: "Exibição:",
    categoriesText: "Categorias",
    category1: "Mais vendidos"
    // continue aqui para mais textos
  };
  
  var itTranslations = {
    pageTitle: "My Piercing Italy",
    welcomeText: "Benvenuto!",
    individualText: "Individuale",
    businessText: "Azienda",
    viewText: "Visualizzazione:",
    categoriesText: "Categorie",
    category1: "Più venduti"
    
    // continue aqui para mais textos
  };
  
  
// Não esqueça de iniciar o i18next com a configuração adequada
i18next.init({
    lng: userLang, // o idioma padrão aqui, depois será automaticamente detectado
    resources: {
      en: { translation: enTranslations },
      pt: { translation: ptTranslations },
      it: { translation: itTranslations }
    }
  }, function(err, t) {
    // IDs dos elementos cujo texto queremos traduzir
    var idsToTranslate = ['pageTitle', 'welcomeText', 'individualText', 'businessText', 'viewText', 'categoriesText', 'category1'];
    
    idsToTranslate.forEach(function(id) {
      var element = document.getElementById(id);
      if (element) {
        element.innerText = t(id); // traduz o texto do elemento
      }
    });
  });
  
  
