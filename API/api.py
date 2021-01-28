from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import requests, os
from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address
import json
import string, flask, waitress

## Dependancies:
# pip install flask flask-cors flask-limiter waitress

os.system("title Cryptant API")

app = Flask(__name__)
cors = CORS(app)

config = {
	"website": "https://cryptantapi.root.sx/",
	"host": "cryptantapi.root.sx",
	"ip": "0.0.0.0",
	"port": 7505
}

def get_remote_address():
    return flask.request.headers.get("X-Real-IP") # Using proxy_pass in nginx & setting header for real ip.

coins = {
 '0x': 'ZRX',
 'Aeon': 'AEON',
 'Algorand': 'ALGO',
 'Ardor': 'ARDR',
 'Ark': 'ARK',
 'Augur': 'REPV2',
 'Basic Attention Token': 'BAT',
 'BitShares': 'BTS',
 'BitTube': 'TUBE',
 'Bitcoin': 'BTC',
 'Bitcoin Cash': 'BCH',
 'Bitcoin SV': 'BSV',
 'BlackCoin': 'BLK',
 'Burst': 'BURST',
 'Bytom': 'BTM',
 'Cardano': 'ADA',
 'Celo': 'CELO',
 'Chainlink': 'LINK',
 'Compound': 'COMP',
 'Cosmos': 'ATOM',
 'Crown': 'CRW',
 'Curecoin': 'CURE',
 'Dai': 'DAI',
 'Dash': 'DASH',
 'Decentraland': 'MANA',
 'Decred': 'DCR',
 'DigiByte': 'DGB',
 'DigitalNote': 'XDN',
 'Dogecoin': 'DOGE',
 'EOS': 'EOS',
 'Einsteinium': 'EMC2',
 'Endor Protocol': 'EDR',
 'Enjin Coin': 'ENJ',
 'Ethereum': 'ETH',
 'Ethereum Classic': 'ETC',
 'ExclusiveCoin': 'EXCL',
 'Expanse': 'EXP',
 'FLO': 'FLO',
 'Feathercoin': 'FTC',
 'Firo': 'FIRO',
 'GameCredits': 'GAME',
 'GeoCoin': 'GEO',
 'Golem Network': 'GLM',
 'Groestlcoin': 'GRS',
 'Gulden': 'NLG',
 'Haven Protocol': 'XHV',
 'Hedera Hashgraph': 'HBAR',
 'Hive': 'HIVE',
 'Hive Backed': 'HBD',
 'Horizen': 'ZEN',
 'I/O Coin': 'IOC',
 'IOTA': 'IOTA',
 'Ignis': 'IGNIS',
 'Komodo': 'KMD',
 'LBRY Credits': 'LBC',
 'Lisk': 'LSK',
 'Litecoin': 'LTC',
 'Loom Network': 'LOOM',
 'Maker': 'MKR',
 'Memetic / PepeCoin': 'MEME',
 'Mercury': 'MER',
 'Metal': 'MTL',
 'MonaCoin': 'MONA',
 'Monero': 'XMR',
 'MonetaryUnit': 'MUE',
 'More Coin': 'MORE',
 'Myriad': 'XMY',
 'NEM': 'XEM',
 'NEO': 'NEO',
 'NavCoin': 'NAV',
 'Nexus': 'NXS',
 'Numeraire': 'NMR',
 'OKCash': 'OK',
 'Obyte': 'GBYTE',
 'PIVX': 'PIVX',
 'Paxos Standard Token': 'PAX',
 'Peercoin': 'PPC',
 'PinkCoin': 'PINK',
 'Ravencoin': 'RVN',
 'ReddCoin': 'RDD',
 'SIBCoin': 'SIB',
 'SOLVE': 'SOLVE',
 'SaluS': 'SLS',
 'Siacoin': 'SC',
 'Spendcoin': 'SPND',
 'Sphere': 'SPHR',
 'StableUSD': 'USDS',
 'Stealth': 'XST',
 'Steem': 'STEEM',
 'Steem Dollars': 'SBD',
 'Stellar': 'XLM',
 'Syscoin': 'SYS',
 'TRON': 'TRX',
 'Tether': 'USDT',
 'Tezos': 'XTZ',
 'TrueUSD': 'TUSD',
 'US Dollar': 'USD',
 'USD//Coin': 'USDC',
 'Ubiq': 'UBQ',
 'Verge': 'XVG',
 'VeriCoin': 'VRC',
 'Vertcoin': 'VTC',
 'Viacoin': 'VIA',
 'WAXP': 'WAXP',
 'Waves': 'WAVES',
 'Zcash': 'ZEC'
 }
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["10 per minute"]
)
keys, values = list(coins.keys()), list(coins.values())
@app.route("/getPrice/<coin>")
@cross_origin()
@limiter.limit("10 per minute")
def home(coin):
	r = requests.get("https://dev-api.shrimpy.io/v1/exchanges/kucoin/ticker").json()
	r = [i for i in r if i['name'] == coin]
	if r:
		return jsonify(r[0])
	else:
		return jsonify({"Error": "Coin Not Found"})

@app.route("/news")
@cross_origin()
@limiter.limit("10 per minute")
def news():
	r = requests.get("https://newsapi.org/v2/everything?q=bitcoin&apiKey=84ac4a0df4f245309a261b7e8f9351d8").json()
	articles = r['articles']
	return jsonify(articles[:9])

@app.route("/getCandles/<coin>/<interval>")
@cross_origin()
@limiter.limit("10 per minute")
def data(coin, interval):
	if coin not in coins:
		return jsonify({"Error": "Coin Not Found"})
	interval = interval.strip('0')
	r = requests.get(f"https://dev-api.shrimpy.io/v1/exchanges/bittrex/candles?quoteTradingSymbol=USD&baseTradingSymbol={coins[coin]}&interval={interval}").json()
	i = 50
	if interval == "1M":
		i = 45
	elif interval == "5M":
		i = 36
	elif interval == "15M":
		i = 45
	elif interval == "1H":
		i = 24
	elif interval == "6H":
		i = 42
	elif interval == "1D":
		i = 30
	return jsonify(r[-i:])

@app.route("/topGainersLosers")
@cross_origin()
@limiter.limit("10 per minute")
def gainlose():
	r = requests.get("https://dev-api.shrimpy.io/v1/exchanges/kucoin/ticker").json()
	r = [i for i in r if i['percentChange24hUsd']]
	r.sort(key=lambda x: float(x['percentChange24hUsd']))
	d = {}
	d['gainers'] = r[-8:][::-1]
	d['losers'] = r[:8][::-1]
	return jsonify(d)

@app.route("/getPrediction/<coin>")
@cross_origin()
@limiter.limit("10 per minute")
def predict(coin):
	if coin not in coins:
		return jsonify({"Error": "Coin Not Found"})
	r = requests.get(f"https://dev-api.shrimpy.io/v1/exchanges/bittrex/candles?quoteTradingSymbol=USD&baseTradingSymbol={coins[coin]}&interval=1D").json()[-11:]
	data = {}
	today = r[-1]
	r.pop(-1)
	avg = round(sum([float(i['close']) for i in r]) / len(r), 3)
	opn_avg = round(sum([float(i['open']) for i in r]) / len(r), 3)
	data['average'] = avg
	data['open_average'] = opn_avg
	if data['average'] <= 10:
		limit = 0.5
	elif data['average'] <= 100:
		limit = 5
	elif data['average'] <= 1000:
		limit = 50
	elif data['average'] <= 10000:
		limit = 1000
	else:
		limit = 2500
	if float(today['close']) - data['average'] >= limit:
		data['buy'] = "No"
		data['sell'] = "Yes"
	else:
		data['buy'] = "Yes"
		data['sell'] = "No"

	data['diff_10_days'] = round(float(today['close']) - float(r[0]['close']), 3)

	if float(today['close']) - data['average'] <= -limit:
		data['hold'] = 'Long Hold/ Buy Now'
	elif float(today['close']) - data['average'] >= limit:
		data['hold'] = 'Short Hold/ Sell Now'
	else:
		data['hold'] = 'Short Hold/ Buy Now (Short Profit)'

	if data['hold'] == 'Short Hold/ Sell Now' and data['sell'] == 'Yes':
		data['conclusion'] = "Sell Now or hold short for more profit. Don't Buy/ Hold long as it may burst (Bubble)"
	elif data['hold'] == 'Short Hold/ Buy Now (Short Profit)' and data['sell'] == 'No':
		data['conclusion'] = "Buy now if not bought. Hold Short and sell due to constant change in price. Don't Hold long"
	else:
		data['conclusion'] = "Hold Long and sell when good profit. Buy now if not bought. Don't go for short profit"
	data['symbol'] = coins[coin]

	return jsonify(data)

valid = string.ascii_letters + string.digits + string.punctuation + string.whitespace

def clean_content(c):
	return "".join([i for i in c if i in valid])

@app.route("/contact/<name>/<email>/<message>")
@cross_origin()
@limiter.limit("10 per minute")
def contact(name, email, message):
	with open("contact.json") as f:
		data = json.load(f)
	email = clean_content(email[:60])
	data[email] = {}
	data[email]['name'] = clean_content(name[:20])
	data[email]['msg'] = clean_content(message[:180])
	with open("contact.json", "w") as f:
		json.dump(data, f, indent=4)
	return jsonify({"success": True})

# app.run(debug=True)

waitress.serve(app, host = config["ip"], port = config["port"])

